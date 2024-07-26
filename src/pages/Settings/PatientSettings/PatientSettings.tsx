import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import PatientTable from "@/pages/Settings/PatientSettings/PatientTable.tsx";
import { useContext } from "react";
import { EncounterContext } from "@/contexts/EncounterContext.tsx";

interface PatientSettingsProps {
  showEncounterContext?: boolean;
}

function PatientSettings(props: PatientSettingsProps) {
  const { showEncounterContext = true } = props;

  const { selectedEncounter } = useContext(EncounterContext);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            Select the Patient to be used as the Patient launch context
            <div className="flex-grow" />
            {showEncounterContext ? (
              <div className="text-xs">
                Encounter context:{" "}
                {selectedEncounter ? (
                  <span
                    className={
                      "px-2 py-0.5 rounded bg-orange-100 text-orange-700"
                    }
                  >
                    {selectedEncounter.id}
                  </span>
                ) : (
                  "None"
                )}
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
