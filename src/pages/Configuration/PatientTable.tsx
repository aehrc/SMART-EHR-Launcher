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
import { Box } from "@mui/material";
import type { Bundle } from "fhir/r5";
import { Patient } from "fhir/r4";
import { formatAge, getFhirServerBaseUrl, humanName } from "../../lib/utils.ts";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import PatientTableView from "./PatientTableView.tsx";
import EncounterTable from "./EncounterTable.tsx";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";

function PatientTable() {
  const [selectedItem, setSelectedItem] = useState<PatientListItem | null>(
    null
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { token } = useContext(TokenContext);
  const { serverUrl } = useSourceFhirServer();

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Patient>>(
    ["patients", serverUrl],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + "/Patient",
        serverUrl,
        token ?? ""
      ),
    { enabled: token !== null }
  );

  const records: Patient[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const patientListItems: PatientListItem[] = useMemo(
    () => getPatientListItems(records),
    [records]
  );

  const emptyRows: number = useMemo(
    () =>
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - patientListItems.length)
        : 0,
    [page, patientListItems.length, rowsPerPage]
  );

  const isEmpty = patientListItems.length === 0;

  const handleRowClick = (id: string) => {
    const selected = patientListItems.find((item) => item.id === id);

    if (selected) {
      if (selected.id === selectedItem?.id) {
        setSelectedItem(null);
      } else {
        setSelectedItem(selected);
      }
    }
  };

  return (
    <>
      <PatientTableView
        selectedItem={selectedItem}
        patientsIsLoading={isLoading}
        patientsIsEmpty={isEmpty}
        fetchError={error}
        patientListItems={patientListItems}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
        onSelectItem={setSelectedItem}
        onRowClick={handleRowClick}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
      <Box my={2} />
      <EncounterTable />
    </>
  );
}

export default PatientTable;

// Helper interfaces and functions
export interface PatientListItem {
  id: string;
  name: string;
  dob: string;
  age: string;
  gender: string;
}

function getPatientListItems(records: Patient[]): PatientListItem[] {
  if (!records || records.length === 0) return [];

  return records.map((entry, i) => {
    return {
      id: entry.id ?? i.toString(),
      name: humanName(entry),
      dob: entry.birthDate ?? "unknown",
      age: entry.birthDate ? formatAge(entry) : "unknown",
      gender: entry.gender ?? "unknown",
    };
  });
}
