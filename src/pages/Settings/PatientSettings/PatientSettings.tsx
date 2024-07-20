import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import PatientTable from "@/pages/Settings/PatientSettings/PatientTable.tsx";
import FormLink from "@/components/FormLink.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

function PatientSettings() {
  const { launch } = useLauncherQuery();
  const patientId = launch.patient ?? null;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient</CardTitle>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            Select the Patient to be used as the Patient launch context
            {patientId ? (
              <div className="text-primary">
                <FormLink
                  title={`Set an encounter for ${patientId}`}
                  path="/settings/encounter"
                />
              </div>
            ) : null}
          </div>
          <PatientTable />
        </CardHeader>
      </Card>
    </div>
  );
}

export default PatientSettings;
