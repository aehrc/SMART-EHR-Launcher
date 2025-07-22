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

import { useMutation } from "@tanstack/react-query";
import useLauncherQuery from "./useLauncherQuery";
import useFhirServerAxios from "./useFhirServerAxios";
import {
  addOrUpdateFhirContext,
  findAusCVDRiskIContext,
  parseFhirContext,
  serializeFhirContext,
} from "@/utils/fhirContext";
import {
  createAusCVDRiskIEndpoint,
  hasAusCVDRiskScope,
  LAUNCH_AUSCVDRISKI_ROLE,
} from "@/utils/ausCVDRisk";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import AusCVDRiskIContextToastCard from "@/components/AusCVDRiskIContextToastCard.tsx";
import useConfig from "@/hooks/useConfig.ts";

/**
 * Handles creation and injection of an Endpoint for AusCVDRisk-i launch scope if current app to launch contains the specific launch-auscvdrisk-i scope.
 *
 * Workflow:
 * 1. On initial load or when the scope changes, check if the scope includes "launch-aus-cvd-risk-i".
 * 2. If present, display a loading indicator as an overlay.
 * 3. Create an AusCVDRisk-i Endpoint with the address:
 *    https://main.dlnanw1r5u3dw.amplifyapp.com/launch?iss={fhirServerUrl}&launch={launchId}
 * 4. POST the Endpoint to the FHIR server.
 * 5. Retrieve the ID of the newly created Endpoint (e.g., Endpoint/456).
 * 6. Add this Endpoint into the current app to launch's fhirContext array with:
 *    - role: "https://smartforms.csiro.au/ig/smart/role/launch-aus-cvd-risk-i"
 *    - type: "Endpoint"
 *    - reference: Endpoint/456.
 */
function useAusCVDRiskEndpointSync() {
  const { launch, setQuery } = useLauncherQuery();
  const { fhirServerUrl } = useConfig();

  const fhirAxios = useFhirServerAxios();

  // Determine if the AusCVDRisk-i scope and fhirContext is present in the launch scope
  const ausCVDRiskIScopePresent = hasAusCVDRiskScope(launch.scope);

  const currentFhirContexts = parseFhirContext(launch.fhir_context);
  const ausCVDRiskIContextPresent = findAusCVDRiskIContext(currentFhirContexts);

  const createToastTimeout = useRef<NodeJS.Timeout | null>(null);
  const showCreateToast = useRef(true);

  // Main React Query mutation that handles both checking and creating the document reference
  const { mutate: createAusCVDRiskIDocumentReferenceMutation, isLoading } =
    useMutation({
      mutationKey: [
        "AusCVDRisk-i",
        "documentReference",
        launch.scope,
        launch.fhir_context,
      ],
      mutationFn: async () => {
        const ausCVDRiskIEndpoint = await createAusCVDRiskIEndpoint(
          fhirAxios,
          launch,
          fhirServerUrl
        );

        if (!ausCVDRiskIEndpoint?.id) {
          throw new Error("Endpoint was created but has no ID");
        }

        const updatedContexts = addOrUpdateFhirContext(currentFhirContexts, {
          role: LAUNCH_AUSCVDRISKI_ROLE,
          type: "Endpoint",
          reference: `Endpoint/${ausCVDRiskIEndpoint.id}`,
        });

        setQuery({
          fhir_context: serializeFhirContext(updatedContexts),
        });

        return ausCVDRiskIEndpoint;
      },
      onMutate: () => {
        showCreateToast.current = true;
        createToastTimeout.current = setTimeout(() => {
          if (!showCreateToast.current) {
            return;
          }

          toast.custom(
            () => (
              <AusCVDRiskIContextToastCard
                title="Creating FhirContext"
                detail="Setting up AusCVDRisk-i Endpoint launch context..."
                icon={
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                }
                badge={
                  <Badge variant="secondary" className="text-xs">
                    Processing
                  </Badge>
                }
              />
            ),
            { id: "ausCvdRiskICreating", duration: Infinity }
          );
        }, 300);
      },
      onSuccess: () => {
        // Dismiss loading toast if it was shown
        showCreateToast.current = false;
        if (createToastTimeout.current) {
          clearTimeout(createToastTimeout.current);
        }
        toast.dismiss("ausCvdRiskICreating");

        // Show success toast
        toast.custom(
          () => (
            <AusCVDRiskIContextToastCard
              title="FhirContext Setup Complete"
              detail="AusCVDRisk-i Endpoint context ready"
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              badge={
                <Badge variant="secondary" className="text-xs">
                  Ready
                </Badge>
              }
            />
          ),
          { id: "ausCvdRiskICreateComplete", duration: 5000 }
        );
      },
      onError: (error) => {
        // Dismiss loading toast if it was shown
        showCreateToast.current = false;
        if (createToastTimeout.current) {
          clearTimeout(createToastTimeout.current);
        }
        toast.dismiss("ausCvdRiskICreating");

        // Show error toast
        toast.custom(
          () => (
            <AusCVDRiskIContextToastCard
              title="AusCVDRisk-i FhirContext Setup Failed"
              detail={error instanceof Error ? error.message : "Unknown error"}
              icon={<AlertCircle className="h-5 w-5 text-red-600" />}
              badge={
                <Badge variant="destructive" className="text-xs">
                  Error
                </Badge>
              }
            />
          ),
          { id: "ausCvdRiskICreateError", duration: 8000 }
        );
      },
    });

  useEffect(() => {
    /**
     * Scope is present, but no existing Endpoint context
     * Trigger the mutation to create an Endpoint and update the fhir_context
     * Additionally, DO NOT fire again if the mutation is already in progress
     */
    if (!isLoading && ausCVDRiskIScopePresent && !ausCVDRiskIContextPresent) {
      createAusCVDRiskIDocumentReferenceMutation();
    }
    //
    // /**
    //  * Scope is missing, but an existing AusCVDRisk-i Endpoint context is present
    //  * Clean up the fhir_context by removing the stale AusCVDRisk-i context
    //  */
    // if (!ausCVDRiskIScopePresent && ausCVDRiskIContextPresent) {
    //   const updatedContexts = removeFhirContext(
    //     currentFhirContexts,
    //     fhirContextIsAusCVDRiskContext
    //   );
    //
    //   setQuery({
    //     fhir_context: serializeFhirContext(updatedContexts),
    //   });
    // }
  }, [
    ausCVDRiskIContextPresent,
    ausCVDRiskIScopePresent,
    createAusCVDRiskIDocumentReferenceMutation,
    isLoading,
  ]);
}

export default useAusCVDRiskEndpointSync;
