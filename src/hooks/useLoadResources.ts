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

import useLauncherQuery from "./useLauncherQuery.ts";
import { useEffect } from "react";
import useConfig from "@/hooks/useConfig.ts";

function useLoadResources() {
  const { query, launch, setQuery } = useLauncherQuery();

  const { fhirServerUrl, defaultApp } = useConfig();

  useEffect(
    () => {
      setQuery({
        ...query,
        launch_url: query.launch_url || defaultApp.launchUrl,
        app_name: query.app_name || defaultApp.appName,
        client_id: launch.client_id || defaultApp.clientId,
        scope: launch.scope || defaultApp.scope,
        redirect_uris: launch.redirect_uris || defaultApp.redirectUris,
        validation: "1",
        fhir_context: launch.fhir_context || "",
        source_fhir_server: launch.source_fhir_server || fhirServerUrl,
        is_embedded_view: launch.is_embedded_view || false,
      });
    },
    // Only run this once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

export default useLoadResources;
