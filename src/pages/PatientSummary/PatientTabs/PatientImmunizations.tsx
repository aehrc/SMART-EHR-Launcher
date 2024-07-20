import { useMemo } from "react";
import useFetchImmunizations from "@/hooks/useFetchImmunizations.ts";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import {
  createImmunizationTableColumns,
  ImmunizationTableData,
} from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";

interface Props {
  patientId: string;
}

function PatientImmunizations(props: Props) {
  const { patientId } = props;

  const { immunizations, isInitialLoading } = useFetchImmunizations(patientId);

  const immunizationTableData: ImmunizationTableData[] = useMemo(() => {
    return immunizations.map((entry) => ({
      id: entry.id ?? nanoid(),
      immunization:
        entry.vaccineCode?.coding?.[0].display ?? entry.vaccineCode?.text ?? "",
      status: entry.status ?? "",
      occurrenceDate: entry.occurrenceDateTime
        ? dayjs(entry.occurrenceDateTime)
        : null,
    }));
  }, [immunizations]);

  const columns = createImmunizationTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Immunisations</CardTitle>
        <CardDescription>
          Patient's record of vaccinations and immunisation history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={immunizationTableData}
          columns={columns}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "occurrenceDate", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientImmunizations;
