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
          isLoading={isInitialLoading}
          initialSorting={[{ id: "effectiveDateTime", desc: true }]}
        />
      </CardContent>
    </Card>
  );
}

export default PatientObservations;
