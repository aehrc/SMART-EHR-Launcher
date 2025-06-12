/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
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
  createEncounterTableColumns,
  EncounterTableData,
} from "@/utils/dataTable.tsx";
import DataTable from "@/components/DataTable.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { useSnackbar } from "notistack";
import { nanoid } from "nanoid";
import useFetchEncounters from "@/hooks/useFetchEncounters.ts";
import { EncounterContext } from "@/contexts/EncounterContext.tsx";
import { Patient } from "fhir/r4";

interface EncounterTableProps {
  selectedPatient: Patient | null;
}

function EncounterTable(props: EncounterTableProps) {
  const { selectedPatient } = props;

  const { setQuery } = useLauncherQuery();
  const { selectedEncounter, setSelectedEncounter } =
    useContext(EncounterContext);

  const selectedEncounterId = selectedEncounter?.id ?? null;
  const selectedPatientId = selectedPatient?.id ?? null;

  const { enqueueSnackbar } = useSnackbar();

  const { encounters, isInitialLoading } = useFetchEncounters(
    selectedPatientId ?? ""
  );

  const encounterTableData: EncounterTableData[] = useMemo(() => {
    return encounters.map((encounter) => ({
      id: encounter.id ?? nanoid(),
      patientRef: encounter.subject?.reference ?? "-",
      resourceType: encounter.resourceType,
    }));
  }, [encounters]);

  const columns = createEncounterTableColumns(
    selectedEncounter,
    selectedPatient,
    handleSetEncounterContext
  );

  function handleSetEncounterContext(id: string) {
    const newEncounter = encounters.find((encounter) => encounter.id === id);

    // User not found OR patient is already selected, unset patient and context
    if (!newEncounter || selectedEncounterId === newEncounter.id) {
      setSelectedEncounter(null);
      setQuery({
        encounter: undefined,
      });
      return;
    }

    // Set selected encounter and query
    setSelectedEncounter(newEncounter);
    setQuery({
      encounter: newEncounter.id,
    });
    enqueueSnackbar(`Encounter set to ${newEncounter.id} `, {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <DataTable
      data={encounterTableData}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedEncounter}
      onClearSelectedData={() => handleSetEncounterContext("")}
    />
  );
}

export default EncounterTable;
