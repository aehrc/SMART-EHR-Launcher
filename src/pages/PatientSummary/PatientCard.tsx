import { Card, CardDescription, CardHeader } from "@/components/ui/card.tsx";
import { User } from "lucide-react";
import { Patient } from "fhir/r4";
import usePatientDetails from "@/hooks/usePatientDetails.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import LaunchButton from "@/pages/PatientSummary/LaunchButton.tsx";

interface PatientCardProps {
  patient: Patient | null;
}

function PatientCard(props: PatientCardProps) {
  const { patient } = props;

  let { patientName, patientGender, patientAge, patientDob } =
    usePatientDetails(patient);

  if (patientName.startsWith("*") || patientName === "") {
    patientName = "Name not specified";
  }

  if (patientAge.startsWith("*") || patientAge === "") {
    patientAge = "";
  }

  if (patientDob.startsWith("*") || patientDob === "") {
    patientDob = "";
  }
  if (patientGender.startsWith("*") || patientGender === "") {
    patientGender = "";
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>Patient Summary</CardDescription>
        {patient ? (
          <div className="flex items-center">
            <div className="flex flex-1 items-center py-2.5 gap-6">
              <User className="h-16 w-16 p-3 rounded-full bg-blue-100 text-blue-800" />
              <div className="flex flex-col gap-0.5">
                <div className="text-2xl font-semibold">{patientName}</div>
                <div className="text-md">{patientDob}</div>
                <div className="text-sm text-muted-foreground">
                  {patientAge} {patientGender.toLowerCase()}
                </div>
              </div>
            </div>
            <LaunchButton />
          </div>
        ) : (
          <div className="flex items-center py-3 gap-6">
            <Skeleton className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-8 w-48 bg-gray-200 animate-pulse" />
              <Skeleton className="h-6 w-32 bg-gray-200 animate-pulse" />
              <Skeleton className="h-3 w-24 bg-gray-200 animate-pulse" />
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  );
}

export default PatientCard;
