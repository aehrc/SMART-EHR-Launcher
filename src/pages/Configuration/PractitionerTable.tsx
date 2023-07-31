/*
 * Copyright 2023 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useContext, useMemo, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import type { Bundle } from "fhir/r5";
import { Practitioner } from "fhir/r4";
import { getFhirServerBaseUrl, humanName } from "../../lib/utils.ts";
import PractitionerTableToolbar from "./PractitionerTableToolbar.tsx";
import TableFeedback from "../TableFeedback.tsx";
import { useQuery } from "@tanstack/react-query";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";

const tableHeaders = [
  { id: "name", label: "Name" },
  { id: "id", label: "ID" },
];

function PractitionerTable() {
  const [selectedItem, setSelectedItem] = useState<PractitionerListItem | null>(
    null
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { token } = useContext(TokenContext);

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Practitioner>>(
    ["practitioner"],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + "/Practitioner",
        token ?? ""
      ),
    { enabled: !!token }
  );

  const records: Practitioner[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  if (error) {
    console.error("No practitioners found. " + error);
  }

  // construct questionnaire list items for data display
  const practitionerListItems: PractitionerListItem[] = useMemo(
    () => getPractitionerListItems(records),
    [records]
  );

  const emptyRows: number = useMemo(
    () =>
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - practitionerListItems.length)
        : 0,
    [page, practitionerListItems.length, rowsPerPage]
  );

  const isEmpty = practitionerListItems.length === 0;

  const handleRowClick = (id: string) => {
    const selected = practitionerListItems.find((item) => item.id === id);

    if (selected) {
      if (selected.id === selectedItem?.id) {
        setSelectedItem(null);
      } else {
        setSelectedItem({
          id: selected.id,
          name: selected.name,
        });
      }
    }
  };

  return (
    <Card>
      <PractitionerTableToolbar
        selected={selectedItem}
        removeSelected={() => setSelectedItem(null)}
      />

      <TableContainer sx={{ minWidth: 600 }}>
        <Table>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow sx={{ height: 56 }}>
              {tableHeaders.map((headCell, index) => (
                <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                  {isLoading ? null : headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {practitionerListItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const { name, id } = row;
                const isSelected = selectedItem?.id === id;

                return (
                  <TableRow
                    hover
                    key={id}
                    tabIndex={-1}
                    selected={isSelected}
                    onClick={() => handleRowClick(row.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell scope="row" sx={{ pl: 4 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ textTransform: "Capitalize" }}
                      >
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ pl: 0 }}>{id}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {isEmpty || error || isLoading ? (
            <TableFeedback
              isEmpty={isEmpty}
              loading={isLoading}
              error={error}
              resourceNamePlural={"practitioners"}
            />
          ) : null}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={practitionerListItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value));
          setPage(0);
        }}
      />
    </Card>
  );
}

export default PractitionerTable;

// Helper interfaces and functions

export interface PractitionerListItem {
  id: string;
  name: string;
}

function getPractitionerListItems(
  records: Practitioner[]
): PractitionerListItem[] {
  if (!records || records.length === 0) return [];

  return records.map((entry, i) => {
    return {
      id: entry.id ?? i.toString(),
      name: humanName(entry),
    };
  });
}
