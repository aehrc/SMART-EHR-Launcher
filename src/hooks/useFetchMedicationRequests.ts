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
import { Bundle, Medication, MedicationRequest } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";
import { NUM_OF_RESOURCES_TO_FETCH } from "@/globals.ts";

interface useFetchMedicationRequestsReturnParams {
  medicationRequests: MedicationRequest[];
  referencedMedications: Medication[];
  queryUrl: string;
  isInitialLoading: boolean;
}

function useFetchMedicationRequests(
  patientId: string
): useFetchMedicationRequestsReturnParams {
  const numOfSearchEntries = NUM_OF_RESOURCES_TO_FETCH;

  const queryUrl = `/MedicationRequest?patient=${patientId}&_count=${numOfSearchEntries}&_sort=-authoredon&_include=MedicationRequest:medication`;

  const axiosInstance = useFhirServerAxios();
  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    [
      "medicationRequests" + patientId + numOfSearchEntries.toString(),
      queryUrl,
    ],
    () => fetchResourceFromEHR(axiosInstance, queryUrl),
    { enabled: patientId !== "" }
  );

  const medicationRequests: MedicationRequest[] = useMemo(
    () => getResources<MedicationRequest>(bundle, "MedicationRequest"),
    [bundle]
  );

  const referencedMedications: Medication[] = useMemo(
    () => getResources<Medication>(bundle, "Medication"),
    [bundle]
  );

  return {
    medicationRequests,
    referencedMedications,
    queryUrl,
    isInitialLoading,
  };
}

export default useFetchMedicationRequests;
