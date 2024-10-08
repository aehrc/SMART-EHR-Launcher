import { useMemo } from "react";
import { ConditionTableData } from "@/utils/patientDetails.ts";
import useFetchConditions from "@/hooks/useFetchConditions.ts";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { createConditionTableColumns } from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";

interface PatientConditionsProps {
  patientId: string;
}

function PatientConditions(props: PatientConditionsProps) {
  const { patientId } = props;

  const { conditions, isInitialLoading } = useFetchConditions(patientId);

  const conditionTableData: ConditionTableData[] = useMemo(() => {
    return conditions.map((entry) => {
      let conditionText =
        entry.code?.coding?.[0].display ??
        entry.code?.text ??
        entry.code?.coding?.[0].code ??
        "*";

      if (
        entry.code?.coding?.[0].system ===
        "http://terminology.hl7.org/CodeSystem/data-absent-reason"
      ) {
        conditionText = "*" + conditionText.toLowerCase();
      }

      return {
        id: entry.id ?? nanoid(),
        condition: conditionText,
        clinicalStatus:
          entry.clinicalStatus?.coding?.[0].display ??
          entry.clinicalStatus?.text ??
          "",
        onsetDate: entry.onsetDateTime ? dayjs(entry.onsetDateTime) : null,
        recordedDate: entry.recordedDate ? dayjs(entry.recordedDate) : null,
      };
    });
  }, [conditions]);

  const columns = createConditionTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conditions</CardTitle>
        <CardDescription>
          Patient's medical history and current diagnoses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={conditionTableData}
          columns={columns}
          isLoading={isInitialLoading}
          initialSorting={[{ id: "recordedDate", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientConditions;
