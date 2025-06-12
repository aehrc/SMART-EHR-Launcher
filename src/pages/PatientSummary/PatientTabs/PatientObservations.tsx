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
  createObservationTableColumns,
  getObservationValueData,
  ObservationTableData,
} from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";
import useFetchObservations from "@/hooks/useFetchObservations.ts";
import dayjs from "dayjs";

interface PatientObservationsProps {
  patientId: string;
}

function PatientObservations(props: PatientObservationsProps) {
  const { patientId } = props;

  const { observations, queryUrl, isInitialLoading } =
    useFetchObservations(patientId);

  const observationTableData: ObservationTableData[] = useMemo(() => {
    return observations.map((entry) => {
      let observationText =
        entry.code.coding?.[0].display ??
        entry.code.text ??
        entry.code.coding?.[0].code ??
        "*";

      if (
        entry.code.coding?.[0].system ===
        "http://terminology.hl7.org/CodeSystem/data-absent-reason"
      ) {
        observationText = "*" + observationText.toLowerCase();
      }

      let categoryText =
        entry.category?.[0].coding?.[0].display ??
        entry.category?.[0].text ??
        entry.category?.[0].coding?.[0].code ??
        "*";

      if (
        entry.category?.[0].coding?.[0].system ===
        "http://terminology.hl7.org/CodeSystem/data-absent-reason"
      ) {
        categoryText = "*" + categoryText.toLowerCase();
      }

      return {
        id: entry.id ?? nanoid(),
        observation: observationText,
        status: entry.status ?? "",
        category: categoryText,
        valueData: getObservationValueData(entry),
        effectiveDateTime: entry.effectiveDateTime
          ? dayjs(entry.effectiveDateTime)
          : entry._effectiveDateTime?.extension?.find(
              (ext) =>
                ext.url ===
                  "http://hl7.org/fhir/StructureDefinition/data-absent-reason" &&
                !!ext.valueCode
            )?.valueCode ?? null,
      };
    });
  }, [observations]);

  const columns = createObservationTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Observations</CardTitle>
        <CardDescription>
          Patient's vital signs, lab results, and clinical measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={observationTableData}
          columns={columns}
          queryUrl={queryUrl}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "effectiveDateTime", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientObservations;
