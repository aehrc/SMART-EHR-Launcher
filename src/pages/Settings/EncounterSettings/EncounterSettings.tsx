import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import EncounterTable from "@/pages/Settings/EncounterSettings/EncounterTable.tsx";
import { useContext } from "react";
import { PatientContext } from "@/contexts/PatientContext.tsx";

function EncounterSettings() {
  const { selectedPatient } = useContext(PatientContext);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Encounter</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="flex-1">
              Select the Encounter to be used as the Encounter launch context
            </span>
            {selectedPatient ? (
              <div className="text-xs">
                Patient context:{" "}
                <span
                  className={"px-2 py-0.5 rounded bg-blue-100 text-blue-800"}
                >
                  {selectedPatient.id}
                </span>
              </div>
            ) : null}
          </div>
          <EncounterTable selectedPatient={selectedPatient} />
        </CardHeader>
      </Card>
    </div>
  );
}

export default EncounterSettings;
