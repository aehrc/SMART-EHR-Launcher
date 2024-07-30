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
import { Bundle, Immunization } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import useAxios from "@/hooks/useAxios.ts";

interface useFetchImmunizationsReturnParams {
  immunizations: Immunization[];
  isInitialLoading: boolean;
}

function useFetchImmunizations(
  patientId: string
): useFetchImmunizationsReturnParams {
  const queryUrl = `/Immunization?patient=${patientId}`;

  const axiosInstance = useAxios();
  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["immunizations" + patientId, queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl),
    { enabled: patientId !== "" }
  );

  const immunizations: Immunization[] = useMemo(
    () => getResources<Immunization>(bundle, "Immunization"),
    [bundle]
  );

  return {
    immunizations,
    isInitialLoading,
  };
}

export default useFetchImmunizations;
