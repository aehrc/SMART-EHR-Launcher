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

import { useQuery } from "@tanstack/react-query";
import type { Bundle, Encounter } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";
import { NUM_OF_RESOURCES_TO_FETCH } from "@/globals.ts";

interface useFetchEncountersReturnParams {
  encounters: Encounter[];
  isInitialLoading: boolean;
}

function useFetchEncounters(patientId: string): useFetchEncountersReturnParams {
  const numOfSearchEntries = NUM_OF_RESOURCES_TO_FETCH;

  // Note: numOfSearchEntries not used in Sparked reference server due to lack of support for _count
  const queryUrl = `/Encounter?patient=${patientId}&_count=${numOfSearchEntries}&_sort=-date`;

  const axiosInstance = useFhirServerAxios();
  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["encounters" + patientId + numOfSearchEntries.toString(), queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl),
    { enabled: patientId !== "" }
  );

  const encounters: Encounter[] = useMemo(
    () => getResources<Encounter>(bundle, "Encounter"),
    [bundle]
  );

  return {
    encounters,
    isInitialLoading,
  };
}

export default useFetchEncounters;
