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
import { Bundle, MedicationRequest } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { getResources } from "@/utils/getResources.ts";

interface useFetchMedicationRequestsReturnParams {
  medicationRequests: MedicationRequest[];
  isInitialLoading: boolean;
}

function useFetchMedicationRequests(
  patientId: string
): useFetchMedicationRequestsReturnParams {
  const queryUrl = `/MedicationRequest?patient=${patientId}`;

  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["medicationRequests" + patientId, queryUrl],
    () => fetchResourceFromEHR(getFhirServerBaseUrl() + queryUrl, "", ""),
    { enabled: patientId !== "" }
  );

  const medicationRequests: MedicationRequest[] = useMemo(
    () => getResources<MedicationRequest>(bundle, "MedicationRequest"),
    [bundle]
  );

  return {
    medicationRequests,
    isInitialLoading,
  };
}

export default useFetchMedicationRequests;
