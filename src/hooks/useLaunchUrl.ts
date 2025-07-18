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

import { LauncherQuery } from "@/hooks/useLauncherQuery.ts";
import { LaunchParams } from "@/lib/codec.ts";
import useConfig from "@/hooks/useConfig.ts";
import { getDefaultLaunchUrl, getProxyLaunchUrl } from "@/lib/launchUrl.ts";

function useLaunchUrl(query: LauncherQuery, launch: LaunchParams): URL {
  const { fhirServerUrl, launchParamConfigType } = useConfig();

  if (launchParamConfigType === "proxy") {
    return getProxyLaunchUrl(query, launch, fhirServerUrl);
  }

  return getDefaultLaunchUrl(query, launch, fhirServerUrl);
}

export default useLaunchUrl;
