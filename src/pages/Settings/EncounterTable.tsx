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
import type { Bundle } from "fhir/r5";
import { Encounter } from "fhir/r4";
import { getFhirServerBaseUrl } from "../../utils/misc.ts";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import EncounterTableView from "./EncounterTableView.tsx";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";

function EncounterTable() {
  const [selectedItem, setSelectedItem] = useState<EncounterListItem | null>(
    null
  );

  const { token } = useContext(TokenContext);

  const { launch } = useLauncherQuery();
  const { serverUrl } = useSourceFhirServer();
  const patientId = launch.patient;

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Encounter>>(
    ["encounters", serverUrl, patientId],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + `/Encounter?patient=${patientId}`,
        serverUrl,
        token ?? ""
      ),
    { enabled: token !== null }
  );

  const records: Encounter[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const encounterListItems: EncounterListItem[] = useMemo(
    () => getEncounterListItems(records),
    [records]
  );

  const isEmpty = encounterListItems.length === 0;

  const handleRowClick = (id: string) => {
    const selected = encounterListItems.find((item) => item.id === id);

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
      <EncounterTableView
        selectedItem={selectedItem}
        encountersIsLoading={isLoading}
        encountersIsEmpty={isEmpty}
        fetchError={error}
        encounterListItems={encounterListItems}
        onSelectItem={setSelectedItem}
        onRowClick={handleRowClick}
      />
    </>
  );
}

export default EncounterTable;

// Helper interfaces and functions
export interface EncounterListItem {
  id: string;
  patientRef: string;
}

function getEncounterListItems(records: Encounter[]): EncounterListItem[] {
  if (!records || records.length === 0) return [];

  return records.map((entry, i) => {
    return {
      id: entry.id ?? i.toString(),
      patientRef: entry.subject?.reference ?? "Unknown patient",
    };
  });
}
