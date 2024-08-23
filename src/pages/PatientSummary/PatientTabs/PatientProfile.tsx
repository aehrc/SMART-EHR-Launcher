import { Patient } from "fhir/r4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import usePatientDetails from "@/hooks/usePatientDetails.ts";

interface PatientProfileProps {
  patient: Patient;
}

function PatientProfile(props: PatientProfileProps) {
  const { patient } = props;

  const {
    patientName,
    patientGender,
    patientAge,
    patientDob,
    patientSexAtBirth,
  } = usePatientDetails(patient);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Patient demographic information and other details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mt-1">
          <div className="flex gap-2">
            <div className="font-medium w-1/5">Patient ID</div>
            <div className="flex w-4/5">
              <div className="px-1.5 py-0.5 rounded text-blue-800 bg-blue-100 ">
                {patient.id}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="font-medium w-1/5">Name</div>
            <div className="text-muted-foreground w-4/5">{patientName}</div>
          </div>

          <div className="flex gap-2">
            <div className="font-medium w-1/5">Gender</div>
            <div className="text-muted-foreground w-4/5">{patientGender}</div>
          </div>

          {patientSexAtBirth ? (
            <div className="flex gap-2">
              <div className="font-medium w-1/5">Sex at Birth</div>
              <div className="text-muted-foreground w-4/5">
                {patientSexAtBirth}
              </div>
            </div>
          ) : null}
          <div className="flex gap-2">
            <div className="font-medium w-1/5">Age</div>
            <div className="text-muted-foreground w-4/5">{patientAge}</div>
          </div>

          <div className="flex  gap-2">
            <div className="font-medium w-1/5">Date of Birth</div>
            <div className="text-muted-foreground w-4/5">{patientDob}</div>
          </div>

          <div className="flex gap-2">
            <div className="font-medium w-1/5">Contact</div>
            <div className="text-muted-foreground w-4/5">
              {patient.telecom
                ? patient.telecom?.map((telecom, index) => (
                    <div key={index} className="flex">
                      <div className="text-muted-foreground">
                        {telecom.value}
                      </div>
                    </div>
                  ))
                : "Not specified"}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="font-medium w-1/5">Address</div>
            <div className="text-muted-foreground w-4/5">
              {patient.address
                ? patient.address?.map((address, index) => (
                    <div key={index} className="flex flex-col">
                      {address.line?.map((line, index) => (
                        <div key={index} className="text-muted-foreground">
                          {line}
                        </div>
                      ))}
                      <div className="text-muted-foreground">
                        {address.city}
                      </div>
                      <div className="text-muted-foreground">
                        {address.postalCode} {address.state}
                      </div>
                    </div>
                  ))
                : "Not specified"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PatientProfile;
