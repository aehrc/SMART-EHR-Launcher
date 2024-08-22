import { useMemo } from "react";
import useFetchMedicationRequests from "@/hooks/useFetchMedicationRequests.ts";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import {
  createMedicationTableColumns,
  MedicationTableData,
} from "@/utils/patientDetails.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import SimpleTable from "@/components/SimpleTable.tsx";

interface PatientMedicationsProps {
  patientId: string;
}

function PatientMedications(props: PatientMedicationsProps) {
  const { patientId } = props;

  const { medicationRequests, isInitialLoading } =
    useFetchMedicationRequests(patientId);

  const medicationTableData: MedicationTableData[] = useMemo(() => {
    return medicationRequests.map((entry) => {
      let medicationText =
        entry.medicationCodeableConcept?.coding?.[0].display ??
        entry.medicationCodeableConcept?.text ??
        entry.medicationCodeableConcept?.coding?.[0].code ??
        entry.medicationReference?.display ??
        "*";

      if (
        entry.medicationCodeableConcept?.coding?.[0].system ===
        "http://terminology.hl7.org/CodeSystem/data-absent-reason"
      ) {
        medicationText = "*" + medicationText.toLowerCase();
      }

      return {
        id: entry.id ?? nanoid(),
        medication: medicationText,
        status: entry.status ?? "",
        authoredOn: entry.authoredOn
          ? dayjs(entry.authoredOn)
          : entry._authoredOn?.extension?.find(
              (ext) =>
                ext.url ===
                  "http://hl7.org/fhir/StructureDefinition/data-absent-reason" &&
                !!ext.valueCode
            )?.valueCode ?? null,
      };
    });
  }, [medicationRequests]);

  const columns = createMedicationTableColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medications</CardTitle>
        <CardDescription>
          Patient's current prescriptions and medication request history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleTable
          data={medicationTableData}
          columns={columns}
          isLoading={isInitialLoading}
        />
      </CardContent>
    </Card>
  );
}

export default PatientMedications;
