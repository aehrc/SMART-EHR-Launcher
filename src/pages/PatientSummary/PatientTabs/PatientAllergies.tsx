import { useMemo } from "react";
import useFetchAllergyIntolerances from "@/hooks/useFetchAllergyIntolerances.ts";
import {
  AllergyTableData,
  createAllergyTableColumns,
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

interface PatientAllergiesProps {
  patientId: string;
}

function PatientAllergies(props: PatientAllergiesProps) {
  const { patientId } = props;

  const { allergyIntolerances, isInitialLoading } =
    useFetchAllergyIntolerances(patientId);

  const allergyTableData: AllergyTableData[] = useMemo(() => {
    return allergyIntolerances.map((entry) => ({
      id: entry.id ?? nanoid(),
      allergy: entry.code?.coding?.[0].display ?? entry.code?.text ?? "",
      category: entry.category?.[0] ?? "",
      criticality: entry.criticality ?? "",
      recordedDate: entry.recordedDate ? dayjs(entry.recordedDate) : null,
    }));
  }, [allergyIntolerances]);

  const columns = createAllergyTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allergies</CardTitle>
        <CardDescription>
          Patient's documented allergic reactions and sensitivities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={allergyTableData}
          columns={columns}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "recordedDate", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientAllergies;
