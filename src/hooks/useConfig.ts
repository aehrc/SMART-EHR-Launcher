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
import { ConfigContext } from "@/contexts/ConfigContext.tsx";
import { ConfigFile } from "@/utils/configFile.ts";

function useConfig(): {
  fhirServerUrl: ConfigFile["fhirServerUrl"];
  authRequired: ConfigFile["authRequired"];
  launchParamConfigType: ConfigFile["launchParamConfigType"];
  oAuthGrantType: ConfigFile["oAuthGrantType"];
  oAuthScope: ConfigFile["oAuthScope"];
  oAuthClientId: ConfigFile["oAuthClientId"];
  formsServerUrl: ConfigFile["formsServerUrl"];
  formsServerToken: ConfigFile["formsServerToken"];
  appList: ConfigFile["appList"];
  defaultApp: ConfigFile["defaultApp"];
} {
  const { config } = useContext(ConfigContext);

  return {
    fhirServerUrl: config.fhirServerUrl,
    authRequired: config.authRequired,
    launchParamConfigType: config.launchParamConfigType,
    oAuthGrantType: config.oAuthGrantType,
    oAuthScope: config.oAuthScope,
    oAuthClientId: config.oAuthClientId,
    formsServerUrl: config.formsServerUrl,
    formsServerToken: config.formsServerToken,
    appList: config.appList,
    defaultApp: config.defaultApp,
  };
}

export default useConfig;
