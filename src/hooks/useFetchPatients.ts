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
import type { Bundle, Patient } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";

interface useFetchPatientsReturnParams {
  patients: Patient[];
  isInitialLoading: boolean;
}

function useFetchPatients(): useFetchPatientsReturnParams {
  const numOfSearchEntries = 500;

  const queryUrl = `/Patient?_count=${numOfSearchEntries}`;

  const axiosInstance = useFhirServerAxios();
  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["patients" + numOfSearchEntries.toString(), queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl)
  );

  const patients: Patient[] = useMemo(
    () => getResources<Patient>(bundle, "Patient"),
    [bundle]
  );

  return {
    patients,
    isInitialLoading,
  };
}

export default useFetchPatients;
