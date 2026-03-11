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

import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import {
  findPractitionerRoleContext,
  parseFhirContext,
} from "@/utils/fhirContext.ts";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResource } from "@/utils/getResources.ts";
import { Bundle, PractitionerRole } from "fhir/r4";
import { PractitionerRoleContext } from "@/contexts/PractitionerRoleContext";
import useFhirServerAxios from "./useFhirServerAxios";

export function usePractitionerRoleContextSync() {
  const { launch } = useLauncherQuery();

  const fhirContextArray = parseFhirContext(launch.fhir_context);
  const axiosInstance = useFhirServerAxios();

  // Sync selected PractitionerRole with fhirContext
  const { setSelectedPractitionerRole } = useContext(PractitionerRoleContext);
  const practitionerRoleContext = findPractitionerRoleContext(fhirContextArray);
  const practitionerRoleQueryUrl = `/${practitionerRoleContext?.reference}`;
  const { data: practitionerRole } = useQuery<PractitionerRole | Bundle>(
    [
      "practitionerRoleProfile",
      practitionerRoleContext?.reference,
      practitionerRoleQueryUrl,
    ],
    () => fetchResourceFromEHR(axiosInstance, practitionerRoleQueryUrl),
    {
      enabled: !!practitionerRoleContext?.reference,
    },
  );

  const newPractitionerRole = getResource<PractitionerRole>(
    practitionerRole,
    "PractitionerRole",
  );

  useEffect(() => {
    if (!newPractitionerRole) {
      return;
    }

    setSelectedPractitionerRole(newPractitionerRole);
  }, [newPractitionerRole]);
}
