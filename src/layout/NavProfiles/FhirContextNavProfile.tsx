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

import { useContext } from "react";
import useLauncherQuery from "@/hooks/useLauncherQuery";
import {
  getGenericFhirContextNavDisplay,
  getQuestionnaireFhirContextNavDisplay,
  LAUNCH_AUSCVDRISKI_CONTEXT_ROLE,
  parseFhirContext,
  serializeFhirContext,
} from "@/utils/fhirContext";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext";
import { Info, Layers, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JsonViewer from "@/components/JSONViewer.tsx";
import { hasAusCVDRiskScope } from "@/utils/ausCVDRisk.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

function FhirContextNavProfile() {
  const { launch, setQuery } = useLauncherQuery();
  const { selectedQuestionnaire, setSelectedQuestionnaire } =
    useContext(QuestionnaireContext);

  // Check if the launch has the AusCVDRisk-i scope
  const ausCVDRiskIScopePresent = hasAusCVDRiskScope(launch.scope);

  const fhirContextArray = parseFhirContext(launch.fhir_context);
  const fhirContextIsEmpty = fhirContextArray.length === 0;

  function handleClearSpecificFhirContext(indexToRemove: number) {
    // Remove the specific fhirContext entry at the given index
    const updatedContexts = fhirContextArray.filter(
      (_, index) => index !== indexToRemove
    );

    // If the removed fhirContext entry was a Questionnaire, clear the selected questionnaire
    if (
      fhirContextArray[indexToRemove].type === "Questionnaire" &&
      selectedQuestionnaire
    ) {
      setSelectedQuestionnaire(null);
    }

    // Update the query with the new fhirContext
    setQuery({ fhir_context: serializeFhirContext(updatedContexts) });
  }

  return (
    <div className="flex items-center gap-2.5 h-16 px-2.5 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-green-700">
        <Layers className="h-5 w-5" />
        <div className="text-xs">FhirContext</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="flex flex-col gap-1 min-w-0">
        {fhirContextIsEmpty ? (
          <div className="text-xs font-medium text-gray-600">N/A</div>
        ) : (
          fhirContextArray.map((entry, index) => {
            // If the entry type is "Questionnaire", use the selected questionnaire's display value
            const displayValue =
              entry.type === "Questionnaire" && selectedQuestionnaire
                ? getQuestionnaireFhirContextNavDisplay(selectedQuestionnaire)
                : getGenericFhirContextNavDisplay(entry);

            // If the current scopes contains AusCVDRisk-i scope and entry is AusCVDRisk-i context role, disallow removal
            const ausCVDRiskIScopeAndContextPresent =
              ausCVDRiskIScopePresent &&
              entry.type === "Endpoint" &&
              entry.role === LAUNCH_AUSCVDRISKI_CONTEXT_ROLE;

            return (
              <div key={index} className="flex items-center gap-1 min-w-0">
                <div className="text-xs">
                  <span className="text-gray-600">{entry.type}:</span>{" "}
                  <span className="text-xs px-1 py-0.5 rounded text-green-800 bg-green-100 break-words max-w-xs inline-block">
                    {displayValue}
                  </span>
                </div>{" "}
                {ausCVDRiskIScopeAndContextPresent ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="cursor-not-allowed">
                        <Button
                          variant="ghost"
                          disabled={true}
                          className="flex h-4 w-4 p-0 m-0 hover:text-red-500 hover:bg-red-50 hover:border hover:border-red-200 focus:outline-none rounded-xl"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Scopes contain launch AusCVDRisk-i role, which prevents
                      removal of this fhirContext entry.
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    variant="ghost"
                    title="Remove this fhirContext entry"
                    className="flex h-4 w-4 p-0 m-0 hover:text-red-500 hover:bg-red-50 hover:border hover:border-red-200 focus:outline-none rounded-xl"
                    onClick={() => handleClearSpecificFhirContext(index)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">
                      Remove this fhirContext entry
                    </span>
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>

      {fhirContextIsEmpty ? null : (
        <>
          <div className="border-l border-gray-300 dark:border-gray-600 h-10" />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                title="View full fhirContext JSON"
                className="flex h-7 w-7 p-0 m-0 text-muted-foreground"
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">View full fhirContext JSON</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>FhirContext JSON</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <div className="bg-muted p-2 rounded text-xs overflow-x-auto max-w-[800px]">
                  <JsonViewer
                    jsonString={JSON.stringify(fhirContextArray, null, 2)}
                  />
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default FhirContextNavProfile;
