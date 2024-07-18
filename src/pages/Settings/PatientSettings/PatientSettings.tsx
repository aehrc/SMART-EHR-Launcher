import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import PatientTable from "@/pages/Settings/PatientSettings/PatientTable.tsx";

function PatientSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient</CardTitle>
          <CardDescription>
            Select the Patient to be used as the Patient launch context
          </CardDescription>
          <div className="pt-2">
            <PatientTable />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PatientSettings;
