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
import RedirectToAuthCallback from "@/pages/OAuth/RedirectToAuthCallback.tsx";
import DashboardLayout from "@/layout/DashboardLayout.tsx";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import InitialPatientSelection from "@/pages/InitialPatientSelection.tsx";
import InitialUserSelection from "@/pages/InitialUserSelection.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import useLoadResources from "@/hooks/useLoadResources.ts";
import useConfig from "@/hooks/useConfig.ts";
import useAusCVDRiskEndpointSync from "@/hooks/useAusCVDRiskEndpointSync.tsx";
import { useQuestionnaireContextSync } from "@/hooks/useQuestionnaireContextSync.ts";

function Home() {
  const { accessToken, fhirUser } = useContext(FhirServerContext);

  // Hooks to sync search params with launch contexts (selected resources)
  useLoadResources();
  useQuestionnaireContextSync();
  useAusCVDRiskEndpointSync();

  const { authRequired, oAuthGrantType } = useConfig();

  const { launch } = useLauncherQuery();
  const launchUser = launch.provider;
  const launchPatient = launch.patient;

  // Use AUTH_REQUIRED to determine if authorisation is required. If not authenticated, redirect to AuthCallback
  // If no grant type is set, app assumes no auth is needed and proceeds to user/patient selection
  if (authRequired === true && accessToken === "") {
    if (oAuthGrantType === "authorization_code") {
      return <RedirectToAuthCallback />;
    }

    // Insert your own auth method here if needed
  }

  // No user selected, redirect to user selection screen
  const fhirUserIsPractitioner =
    fhirUser && fhirUser.startsWith("Practitioner");
  if (!launchUser && !fhirUserIsPractitioner) {
    return <InitialUserSelection />;
  }

  // No patient selected, redirect to patient selection screen
  if (!launchPatient) {
    return <InitialPatientSelection />;
  }

  return <DashboardLayout />;
}

export default Home;
