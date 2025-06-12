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
import useFetchProcedures from "@/hooks/useFetchProcedures.ts";
import {
  createProcedureTableColumns,
  ProcedureTableData,
} from "@/utils/patientDetails.tsx";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";

interface PatientProceduresProps {
  patientId: string;
}

function PatientProcedures(props: PatientProceduresProps) {
  const { patientId } = props;

  const { procedures, queryUrl, isInitialLoading } =
    useFetchProcedures(patientId);

  const procedureTableData: ProcedureTableData[] = useMemo(() => {
    return procedures.map((entry) => {
      let procedureText =
        entry.code?.coding?.[0].display ??
        entry.code?.text ??
        entry.code?.coding?.[0].code ??
        "*";

      if (
        entry.code?.coding?.[0].system ===
        "http://terminology.hl7.org/CodeSystem/data-absent-reason"
      ) {
        procedureText = "*" + procedureText.toLowerCase();
      }

      const performedPeriodStart = entry.performedPeriod?.start
        ? dayjs(entry.performedPeriod.start)
        : null;
      const performedDateTime = entry.performedDateTime
        ? dayjs(entry.performedDateTime)
        : null;
      const performedOn = performedPeriodStart ?? performedDateTime ?? null;

      return {
        id: entry.id ?? nanoid(),
        procedure: procedureText,
        status: entry.status ?? "",
        reason:
          entry.reasonCode?.[0].coding?.[0].display ??
          entry.reasonCode?.[0].text ??
          "",
        performedOn: performedOn,
      };
    });
  }, [procedures]);

  const columns = createProcedureTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Procedures</CardTitle>
        <CardDescription>
          Patient's records of past surgeries and medical procedures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={procedureTableData}
          columns={columns}
          queryUrl={queryUrl}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "performedOn", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientProcedures;
