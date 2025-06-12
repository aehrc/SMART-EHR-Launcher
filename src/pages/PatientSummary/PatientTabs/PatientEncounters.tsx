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

import { useMemo } from "react";
import { nanoid } from "nanoid";
import {
  createEncounterTableColumns,
  EncounterTableData,
} from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";
import useFetchEncounters from "@/hooks/useFetchEncounters.ts";

interface PatientEncountersProps {
  patientId: string;
}

function PatientEncounters(props: PatientEncountersProps) {
  const { patientId } = props;

  const { encounters, queryUrl, isInitialLoading } =
    useFetchEncounters(patientId);

  const encounterTableData: EncounterTableData[] = useMemo(() => {
    return encounters.map((entry) => ({
      id: entry.id ?? nanoid(),
      type: entry.type?.[0].coding?.[0].display ?? entry.type?.[0].text ?? "",
      class: entry.class?.display ?? entry.class.code ?? "",
      status: entry.status ?? "",
      period: entry.period ?? null,
    }));
  }, [encounters]);

  const columns = createEncounterTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Encounters</CardTitle>
        <CardDescription>
          Patient's visit history and clinical interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={encounterTableData}
          columns={columns}
          queryUrl={queryUrl}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "period", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientEncounters;
