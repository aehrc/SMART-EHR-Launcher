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

import { base64UrlEncode, encode, LaunchParams } from "./codec.ts";
import { LauncherQuery } from "../hooks/useLauncherQuery.ts";

export const DEFAULT_LAUNCH_PARAMS: LaunchParams = {
  launch_type: "provider-ehr",
  patient: "",
  provider: "",
  encounter: "",
  skip_login: false,
  skip_auth: false,
  sim_ehr: false,
  scope: "",
  redirect_uris: "",
  client_id: "",
  client_secret: "",
  client_type: "public",
  pkce: "auto",
};

export function getProxyLaunchUrl(
  query: LauncherQuery,
  launch: LaunchParams,
  fhirServerUrl: string
) {
  const { launch_type, sim_ehr } = launch;
  const { launch_url } = query;

  const launchCode = encode({
    ...DEFAULT_LAUNCH_PARAMS,
    launch_type,
    patient: launch.patient,
    provider: launch.provider,
    encounter: launch.encounter,
    skip_login: launch.skip_login,
    skip_auth: launch.skip_auth,
    sim_ehr,
    scope: launch.scope,
    redirect_uris: launch.redirect_uris,
    client_id: launch.client_id,
    client_secret: launch.client_secret,
    auth_error: launch.auth_error,
    jwks_url: launch.jwks_url,
    jwks: launch.jwks,
    client_type: launch.client_type,
    pkce: launch.pkce,
    fhir_context: launch.fhir_context,
    source_fhir_server: launch.source_fhir_server,
    is_embedded_view: launch.is_embedded_view,
  });

  // FHIR baseUrl for EHR launches
  const iss = fhirServerUrl;

  let userLaunchUrl: URL | undefined;
  try {
    userLaunchUrl = new URL(launch_url || "", origin);
  } catch {
    userLaunchUrl = new URL("/", origin);
  }
  userLaunchUrl.searchParams.set("iss", iss);
  userLaunchUrl.searchParams.set("launch", launchCode);

  if (sim_ehr) {
    userLaunchUrl = new URL(
      `/ehr?app=${encodeURIComponent(userLaunchUrl.href)}`,
      origin
    );
  }

  return userLaunchUrl;
}

export function getDefaultLaunchUrl(
  query: LauncherQuery,
  launch: LaunchParams,
  fhirServerUrl: string
) {
  const { launch_url } = query;

  let launchContexts: object = {
    patient: launch.patient,
    practitioner: launch.provider,
  };

  if (launch.encounter) {
    launchContexts = {
      ...launchContexts,
      encounter: launch.encounter,
    };
  }

  const launchCode = base64UrlEncode(JSON.stringify(launchContexts));

  // FHIR baseUrl for EHR launches
  const iss = fhirServerUrl;

  let userLaunchUrl: URL | undefined;
  try {
    userLaunchUrl = new URL(launch_url || "", origin);
  } catch {
    userLaunchUrl = new URL("/", origin);
  }
  userLaunchUrl.searchParams.set("iss", iss);
  userLaunchUrl.searchParams.set("launch", launchCode);

  return userLaunchUrl;
}
