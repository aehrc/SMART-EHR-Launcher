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

import useLauncherQuery from "@/hooks/useLauncherQuery";
import { parseFhirContext } from "@/utils/fhirContext";
import { Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function LaunchContextDialog() {
  const { launch } = useLauncherQuery();

  const patientId = launch.patient ?? null;
  const userId = launch.provider ?? null;
  const encounterId = launch.encounter ?? null;
  const fhirContextArray = parseFhirContext(launch.fhir_context);

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-7 w-7 p-0 m-0 text-muted-foreground"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">More info</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Detailed Launch Context Information</TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Launch Context Information</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-2.5 text-xs">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-muted-foreground w-20">Patient</span>
                <span className="text-muted-foreground mr-2">:</span>
                <div className="px-1.5 py-0.5 rounded text-blue-800 bg-blue-100">
                  {patientId ?? "Not selected"}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground w-20">User</span>
                <span className="text-muted-foreground mr-2">:</span>
                <div className="px-1.5 py-0.5 rounded text-purple-800 bg-purple-100">
                  {userId ?? "Not selected"}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground w-20">Encounter</span>
                <span className="text-muted-foreground mr-2">:</span>
                {encounterId ? (
                  <div className="px-1.5 py-0.5 rounded text-orange-700 bg-orange-100">
                    {encounterId}
                  </div>
                ) : (
                  "N/A"
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center text-xs mb-2">
                <span className="text-muted-foreground w-20">FhirContext</span>
                <span className="text-muted-foreground mr-2">:</span>
                {fhirContextArray.length === 0 ? "N/A" : null}
              </div>
              {fhirContextArray.length > 0 ? (
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto max-w-[620px]">
                  <code>{JSON.stringify(fhirContextArray, null, 2)}</code>
                </pre>
              ) : null}
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default LaunchContextDialog;
