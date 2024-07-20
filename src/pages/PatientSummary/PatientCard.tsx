import { Card, CardDescription, CardHeader } from "@/components/ui/card.tsx";
import { User } from "lucide-react";
import { Patient } from "fhir/r4";
import usePatientDetails from "@/hooks/usePatientDetails.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

interface PatientCardProps {
  patient: Patient | null;
}

function PatientCard(props: PatientCardProps) {
  const { patient } = props;

  const { patientName, patientAge, patientDob } = usePatientDetails(patient);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Patient Summary</CardDescription>
        <div className="flex items-center py-3 gap-6">
          {patient ? (
            <>
              <User className="h-16 w-16 p-3 rounded-full bg-blue-100 text-blue-800" />
              <div className="flex flex-col">
                <div className="text-2xl font-semibold">{patientName}</div>
                <div className="text-md">{patientDob}</div>
                <div className="text-sm text-muted-foreground">
                  {patientAge} {patient.gender}
                </div>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-8 w-48 bg-gray-200 animate-pulse" />
                <Skeleton className="h-6 w-32 bg-gray-200 animate-pulse" />
                <Skeleton className="h-3 w-24 bg-gray-200 animate-pulse" />
              </div>
            </>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export default PatientCard;
