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

import { AxiosInstance } from "axios";
import { Endpoint } from "fhir/r4";
import { encode, LaunchParams } from "@/lib/codec";
import { DEFAULT_LAUNCH_PARAMS } from "@/lib/launchUrl";

export const LAUNCH_AUSCVDRISKI_ROLE =
  "https://smartforms.csiro.au/ig/smart/role/launch-aus-cvd-risk-i";
export const LAUNCH_AUSCVDRISKI_SCOPE =
  "launch/endpoint?role=https://smartforms.csiro.au/ig/smart/role/launch-aus-cvd-risk-i";

// Fixed AusCVDRisk-i App Launch config
const AUSCVDRISKI_LAUNCH_URL =
  "https://main.dlnanw1r5u3dw.amplifyapp.com/launch";
const AUSCVDRISKI_CLIENT_ID = "aus-cvd-risk-i";
const AUSCVDRISKI_SCOPES =
  "launch openid fhirUser online_access patient/Patient.r patient/Encounter.r patient/Condition.s patient/Observation.cs patient/Medication.r patient/MedicationRequest.s";
const AUSCVDRISK_REDIRECT_URIS = `https://main.dlnanw1r5u3dw.amplifyapp.com/`;

/**
 * Create launch URL for AusCVDRisk-i without fhirContext
 */
export function createAusCVDRiskILaunchUrl(
  launch: LaunchParams,
  fhirServerUrl: string
): string {
  const ausCVDRiskLaunchParams = {
    ...DEFAULT_LAUNCH_PARAMS,
    launch_type: launch.launch_type,
    patient: launch.patient,
    provider: launch.provider,
    encounter: launch.encounter,
    skip_login: launch.skip_login,
    skip_auth: launch.skip_auth,
    sim_ehr: launch.sim_ehr,
    scope: AUSCVDRISKI_SCOPES,
    redirect_uris: AUSCVDRISK_REDIRECT_URIS,
    client_id: AUSCVDRISKI_CLIENT_ID,
    client_secret: launch.client_secret,
    client_type: launch.client_type,
    pkce: launch.pkce,
    // Explicitly omit fhir_context for AusCVDRisk-i
    fhir_context: undefined,
    source_fhir_server: launch.source_fhir_server,
    is_embedded_view: launch.is_embedded_view,
  };

  const launchId = encode(ausCVDRiskLaunchParams);

  return `${AUSCVDRISKI_LAUNCH_URL}?iss=${encodeURIComponent(
    fhirServerUrl
  )}&launch=${launchId}`;
}

/**
 * Create endpoint for AusCVDRisk-i
 */
export async function createAusCVDRiskIEndpoint(
  axiosInstance: AxiosInstance,
  launch: LaunchParams,
  fhirServerUrl: string
): Promise<Endpoint> {
  // Create the AusCVDRisk-i endpoint address
  const ausCVDRiskILaunchUrl = createAusCVDRiskILaunchUrl(
    launch,
    fhirServerUrl
  );

  const endpoint: Partial<Endpoint> = {
    resourceType: "Endpoint",
    status: "active",
    connectionType: {
      system: "http://terminology.hl7.org/CodeSystem/endpoint-connection-type",
      code: "hl7-fhir-rest",
    },
    name: "AusCVDRisk-i Launch Endpoint",
    managingOrganization: {
      display: "National Heart Foundation of Australia",
    },
    contact: [
      {
        system: "email",
        value: "cvdriskteam@heartfoundation.org.au",
        use: "work",
      },
    ],
    payloadType: [
      {
        coding: [
          {
            system: "urn:ihe:pcc:cm:2008",
            code: "urn:ihe:pcc:cm:2008",
            display: "Care Management (CM)",
          },
        ],
        text: "Care Management Document",
      },
    ],
    payloadMimeType: ["text/html"],
    address: ausCVDRiskILaunchUrl,
  };

  const { data } = await axiosInstance.post<Endpoint>("/Endpoint", endpoint);
  return data;
}

/**
 * Check if scopes string contains AusCVDRisk-i scope
 */
export function hasAusCVDRiskScope(scope: string | undefined): boolean {
  return (scope || "").includes(LAUNCH_AUSCVDRISKI_SCOPE);
}
