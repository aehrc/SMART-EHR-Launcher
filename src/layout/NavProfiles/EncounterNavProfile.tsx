/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Ambulance } from "lucide-react";

function EncounterNavProfile() {
  const { launch } = useLauncherQuery();

  const encounterId = launch.encounter;

  let encounterSelected =
    encounterId && encounterId !== "" ? encounterId : "N/A";

  return (
    <div className="flex items-center gap-2.5 h-16 px-2.5 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-orange-500">
        <Ambulance className="h-5 w-5" />
        <div className="text-xs">Encounter</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="flex">
        {encounterSelected === "N/A" ? (
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
