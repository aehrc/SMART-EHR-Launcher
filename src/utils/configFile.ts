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

export interface AppConfig {
  appName: string;
  launchUrl: string;
  clientId: string;
  scope: string;
  redirectUris: string;
  isEmbeddedView: boolean;
}

export interface ConfigFile {
  // FHIR server for Patient record data
  fhirServerUrl: string;

  // Whether your server requires authorisation. If launchParamConfigType="proxy", this should be false.
  authRequired: boolean;

  // Launch parameter configuration type. "proxy" or "default" - See README.md
  launchParamConfigType: "default" | "proxy";

  // (Optional) Need to include these config values if you are using OAuth configuration. Only authorization_code is implemented
  oAuthGrantType: "authorization_code" | null | undefined;
  oAuthScope: string | null | undefined;
  oAuthClientId: string | null | undefined;

  // FHIR server for Questionnaire definitions
  formsServerUrl: string;

  // List of applications preconfigured in "App Launch" settings
  appList: AppConfig[];
  defaultApp: AppConfig;
}

export const FALLBACK_CONFIG: ConfigFile = {
  fhirServerUrl: "https://proxy.smartforms.io/v/r4/fhir",
  authRequired: false,
  launchParamConfigType: "proxy",
  oAuthGrantType: undefined,
  oAuthScope: undefined,
  oAuthClientId: undefined,
  formsServerUrl: "https://smartforms.csiro.au/api/fhir",
  appList: [
    {
      appName: "Health Check Assessment",
      launchUrl: "https://smartforms.csiro.au/launch",
      clientId: "a57d90e3-5f69-4b92-aa2e-2992180863c1",
      scope:
        "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
      redirectUris: "https://smartforms.csiro.au",
      isEmbeddedView: false,
    },
  ],
  defaultApp: {
    appName: "Health Check Assessment",
    launchUrl: "https://smartforms.csiro.au/launch",
    clientId: "a57d90e3-5f69-4b92-aa2e-2992180863c1",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirectUris: "https://smartforms.csiro.au",
    isEmbeddedView: false,
  },
};

export function responseIsConfigFile(response: any): response is ConfigFile {
  return (
    response &&
    typeof response === "object" &&
    // Check required properties
    isValidFhirServerUrl(response.fhirServerUrl) &&
    isValidAuthRequired(response.authRequired) &&
    isValidLaunchParamConfigType(response.launchParamConfigType) &&
    isValidFormsServerUrl(response.formsServerUrl) &&
    isValidAppList(response.appList) &&
    isValidDefaultApp(response.defaultApp) &&
    // Check optional properties
    (response.oAuthGrantType === undefined ||
      isValidOAuthGrantType(response.oAuthGrantType)) &&
    (response.oAuthScope === undefined ||
      isValidOAuthScope(response.oAuthScope)) &&
    (response.oAuthClientId === undefined ||
      isValidOAuthClientId(response.oAuthClientId))
  );
}

export function isValidFhirServerUrl(value: any): value is string {
  return typeof value === "string" && /^https?:\/\/.+/.test(value.trim());
}

export function isValidAuthRequired(value: any): value is boolean {
  return typeof value === "boolean";
}

export function isValidLaunchParamConfigType(
  value: any
): value is "default" | "proxy" {
  return value === "default" || value === "proxy";
}

export function isValidOAuthGrantType(
  value: any
): value is "authorization_code" | null {
  return value === "authorization_code" || value === null;
}

export function isValidOAuthScope(value: any): value is string | null {
  return typeof value === "string" || value === null;
}

export function isValidOAuthClientId(value: any): value is string | null {
  return typeof value === "string" || value === null;
}

export function isValidFormsServerUrl(value: any): value is string {
  return typeof value === "string" && /^https?:\/\/.+/.test(value.trim());
}

export function isValidAppList(value: any): value is AppConfig[] {
  return Array.isArray(value) && value.every(appConfigIsValid);
}

export function isValidDefaultApp(value: any): value is AppConfig {
  return appConfigIsValid(value);
}

export function appConfigIsValid(app: any): app is AppConfig {
  return (
    app &&
    typeof app.appName === "string" &&
    typeof app.launchUrl === "string" &&
    typeof app.clientId === "string" &&
    typeof app.scope === "string" &&
    typeof app.redirectUris === "string" &&
    typeof app.isEmbeddedView === "boolean"
  );
}

export async function loadConfigFle(): Promise<ConfigFile> {
  const response = await fetch("/config.json");

  if (!response.ok) {
    throw new Error(
      "Failed to load config.json. It might be missing or malformed."
    );
  }

  return response.json();
}
