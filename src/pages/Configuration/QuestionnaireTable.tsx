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

import { useMemo, useState } from "react";
import {
  Box,
  Button,
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
import type { Bundle, Questionnaire } from "fhir/r5";
import QuestionnaireTableToolbar from "./QuestionnaireTableToolbar.tsx";
import TableFeedback from "../TableFeedback.tsx";
import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireServerBaseUrl,
  QUERY_HEADERS,
} from "../../lib/utils.ts";
import TableDisabled from "../TableDisabled.tsx";
import axios from "axios";

const tableHeaders = [
  { id: "name", label: "Name" },
  { id: "id", label: "ID" },
];

interface Props {
  disabled: boolean;
}

function QuestionnaireTable(props: Props) {
  const { disabled } = props;

  const [isDisabled, setIsDisabled] = useState(disabled);

  const [selectedItem, setSelectedItem] =
    useState<QuestionnaireListItem | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Questionnaire>>(["questionnaire"], () =>
    axios(getQuestionnaireServerBaseUrl() + "/Questionnaire?_count=200", {
      headers: QUERY_HEADERS,
    }).then((res) => res.data)
  );

  const records: Questionnaire[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  if (error) {
    console.error("No questionnaires found. " + error);
  }

  // construct questionnaire list items for data display
  const questionnaireListItems: QuestionnaireListItem[] = useMemo(
    () => getQuestionnaireListItems(records),
    [records]
  );

  const emptyRows: number = useMemo(
    () =>
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - questionnaireListItems.length)
        : 0,
    [page, questionnaireListItems.length, rowsPerPage]
  );

  const isEmpty = questionnaireListItems.length === 0;

  const handleRowClick = (id: string) => {
    const selected = questionnaireListItems.find((item) => item.id === id);

    if (selected) {
      if (selected.id === selectedItem?.id) {
        setSelectedItem(null);
      } else {
        setSelectedItem({
          id: selected.id,
          title: selected.title,
          url: selected.url,
          version: selected.version,
        });
      }
    }
  };

  if (isDisabled) {
    return (
      <Card>
        <Box display={"flex"} justifyContent="end">
          <Button variant="contained" onClick={() => setIsDisabled(false)}>
            Enable anyway (launch may fail or questionnaire context may not
            work!)
          </Button>
        </Box>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableDisabled resourceName={"Questionnaire"} />
          </Table>
        </TableContainer>
      </Card>
    );
  }

  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        Connected to forms server at <b>{getQuestionnaireServerBaseUrl()}</b>
      </Typography>
      <Card>
        <QuestionnaireTableToolbar
          selected={selectedItem}
          removeSelected={() => setSelectedItem(null)}
        />

        <TableContainer sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow sx={{ height: 42 }}>
                {tableHeaders.map((headCell, index) => (
                  <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                    {isLoading ? null : headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questionnaireListItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { title, id } = row;
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
                          {title}
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
                resourceNamePlural={"questionnaires"}
              />
            ) : null}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={questionnaireListItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
          }}
        />
      </Card>
    </>
  );
}

export default QuestionnaireTable;

// Helper interfaces and functions
export interface QuestionnaireListItem {
  id: string;
  title: string;
  url: string;
  version: string;
}

function getQuestionnaireListItems(
  records: Questionnaire[]
): QuestionnaireListItem[] {
  if (!records || records.length === 0) return [];

  return records.map((entry, i) => {
    return {
      id: entry.id ?? i.toString(),
      title: entry.title ?? "Undefined questionnaire",
      url: entry.url ?? "",
      version: entry.version ?? "",
    };
  });
}
