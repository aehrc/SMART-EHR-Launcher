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

import { useContext, useMemo } from "react";
import {
  createPatientTableColumns,
  PatientTableData,
} from "@/utils/dataTable.tsx";
import DataTable from "@/components/DataTable.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { useSnackbar } from "notistack";
import { humanName } from "@/utils/misc.ts";
import { nanoid } from "nanoid";
import { PatientContext } from "@/contexts/PatientContext.tsx";
import useFetchPatients from "@/hooks/useFetchPatients.ts";

function PatientTable() {
  const { selectedPatient, setSelectedPatient } = useContext(PatientContext);
  const { setQuery } = useLauncherQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { patients, isInitialLoading } = useFetchPatients();

  const patientTableData: PatientTableData[] = useMemo(() => {
    return patients.map((patient) => ({
      id: patient.id ?? nanoid(),
      name: patient.name ? humanName(patient) : "Unnamed",
      gender: patient.gender ?? "-",
      dob: patient.birthDate ?? "-",
      resourceType: patient.resourceType,
    }));
  }, [patients]);

  const columns = createPatientTableColumns(
    selectedPatient,
    handleSetPatientContext
  );

  function handleSetPatientContext(id: string) {
    const newPatient = patients.find((patient) => patient.id === id);

    // User not found OR patient is already selected, unset patient and context
    if (!newPatient || selectedPatient?.id === newPatient.id) {
      setSelectedPatient(null);
      setQuery({
        patient: undefined,
      });
      return;
    }

    // Set selected patient and set query
    setSelectedPatient(newPatient);
    setQuery({
      patient: newPatient.id,
    });
    enqueueSnackbar(`Patient changed to ${humanName(newPatient)} `, {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <DataTable
      data={patientTableData}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedPatient}
    />
  );
}

export default PatientTable;
