import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

function PatientSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient</CardTitle>
          <CardDescription>
            Read-only overview of key configurations for the launching
            application
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default PatientSettings;
