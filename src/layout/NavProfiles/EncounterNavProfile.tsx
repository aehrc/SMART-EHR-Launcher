import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Ambulance } from "lucide-react";

function EncounterNavProfile() {
  const { launch } = useLauncherQuery();

  const encounterId = launch.encounter;

  let encounterSelected =
    encounterId && encounterId !== "" ? encounterId : "Not selected";

  return (
    <div className="flex items-center gap-2.5 h-16 px-2.5 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-orange-500">
        <Ambulance className="h-5 w-5" />
        <div className="text-xs">Encounter</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="flex">
        {encounterSelected === "Not selected" ? (
          <div className="text-xs font-medium text-gray-600">
            {encounterSelected}
          </div>
        ) : (
          <div className="text-xs px-1.5 py-0.5 rounded text-orange-600 bg-orange-100">
            {encounterId}
          </div>
        )}
      </div>
    </div>
  );
}

export default EncounterNavProfile;
