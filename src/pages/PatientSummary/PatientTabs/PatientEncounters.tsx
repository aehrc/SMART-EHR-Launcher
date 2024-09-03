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

  const { encounters, isInitialLoading } = useFetchEncounters(patientId);

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
          isLoading={isInitialLoading}
          initialSorting={[{ id: "period", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientEncounters;
