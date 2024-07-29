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

  const { observations, isInitialLoading } = useFetchObservations(patientId);

  const observationTableData: ObservationTableData[] = useMemo(() => {
    return observations.map((entry) => ({
      id: entry.id ?? nanoid(),
      observation: entry.code.coding?.[0].display ?? entry.code.text ?? "",
      status: entry.status ?? "",
      category:
        entry.category?.[0].coding?.[0].display ??
        entry.category?.[0].text ??
        "",
      valueData: getObservationValueData(entry),
      effectiveDateTime: entry.effectiveDateTime
        ? dayjs(entry.effectiveDateTime)
        : null,
    }));
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
          isLoading={isInitialLoading}
          initialSorting={[{ id: "effectiveDateTime", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientObservations;
