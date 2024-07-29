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

  const { procedures, isInitialLoading } = useFetchProcedures(patientId);

  const procedureTableData: ProcedureTableData[] = useMemo(() => {
    return procedures.map((entry) => {
      const performedPeriodStart = entry.performedPeriod?.start
        ? dayjs(entry.performedPeriod.start)
        : null;
      const performedDateTime = entry.performedDateTime
        ? dayjs(entry.performedDateTime)
        : null;
      const performedOn = performedPeriodStart ?? performedDateTime ?? null;

      return {
        id: entry.id ?? nanoid(),
        procedure: entry.code?.coding?.[0].display ?? entry.code?.text ?? "",
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
          isLoading={isInitialLoading}
          initialSorting={[{ id: "performedOn", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientProcedures;
