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
import useFetchMedicationStatements from "@/hooks/useFetchMedicationStatements.ts";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import {
  createMedicationStatementTableColumns,
  MedicationStatementTableData,
} from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";
import { getMedicationLabel } from "@/utils/medicationText.ts";
import useConfig from "@/hooks/useConfig.ts";

interface PatientMedicationStatementsProps {
  patientId: string;
}

function PatientMedicationStatements(props: PatientMedicationStatementsProps) {
  const { patientId } = props;

  const { fhirServerUrl } = useConfig();

  const {
    medicationStatements,
    referencedMedications,
    queryUrl,
    isInitialLoading,
  } = useFetchMedicationStatements(patientId);

  const medicationStatementTableData: MedicationStatementTableData[] =
    useMemo(() => {
      return medicationStatements.map((entry) => {
        const medicationLabel = getMedicationLabel(
          entry,
          referencedMedications,
          fhirServerUrl
        );

        const effectivePeriodStart = entry.effectivePeriod?.start
          ? dayjs(entry.effectivePeriod.start)
          : null;
        const effectiveDateTime = entry.effectiveDateTime
          ? dayjs(entry.effectiveDateTime)
          : null;
        const effective = effectivePeriodStart ?? effectiveDateTime ?? null;

        return {
          id: entry.id ?? nanoid(),
          medication: medicationLabel,
          status: entry.status ?? "",
          dosage: entry.dosage?.[0].text ?? "",
          reasonCode:
            entry.reasonCode?.[0]?.coding?.[0]?.display ??
            entry.reasonCode?.[0]?.text ??
            entry.reasonCode?.[0]?.coding?.[0].code ??
            "",
          effective: effective,
        };
      });
    }, [fhirServerUrl, medicationStatements, referencedMedications]);

  const columns = createMedicationStatementTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Statements</CardTitle>
        <CardDescription>
          Patient's reported medication usage, including past and current
          non-prescribed drugs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={medicationStatementTableData}
          columns={columns}
          queryUrl={queryUrl}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "effective", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientMedicationStatements;
