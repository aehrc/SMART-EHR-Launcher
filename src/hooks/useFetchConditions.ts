/*
 * Copyright 2024 Commonwealth Scientific and Industrial Research
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

import { useQuery } from "@tanstack/react-query";
import type { Bundle, Condition } from "fhir/r4";
import { useContext, useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

interface useFetchConditionsReturnParams {
  conditions: Condition[];
  isInitialLoading: boolean;
}

function useFetchConditions(patientId: string): useFetchConditionsReturnParams {
  const queryUrl = `/Condition?patient=${patientId}`;

  const { baseUrl, token } = useContext(FhirServerContext);

  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["conditions" + patientId, queryUrl],
    () => fetchResourceFromEHR(baseUrl + queryUrl, token),
    { enabled: patientId !== "" }
  );

  const conditions: Condition[] = useMemo(
    () => getResources<Condition>(bundle, "Condition"),
    [bundle]
  );

  return {
    conditions,
    isInitialLoading,
  };
}

export default useFetchConditions;
