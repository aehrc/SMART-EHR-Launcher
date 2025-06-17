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

import { humanName } from "../../utils/misc.ts";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { useQuery } from "@tanstack/react-query";
import { Bundle, Patient } from "fhir/r4";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { getResource } from "../../utils/getResources.ts";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";

function PatientNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();

  const { selectedPatient, setSelectedPatient } = useContext(PatientContext);

  const patientId = launch.patient;

  const queryUrl = patientId ? `/Patient/${patientId}` : "/Patient";

  const axiosInstance = useFhirServerAxios();
  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Patient | Bundle>(["patientProfile", patientId, queryUrl], () =>
    fetchResourceFromEHR(axiosInstance, queryUrl)
  );

  const newPatient = getResource<Patient>(resource, "Patient");

  useEffect(() => {
    if (!newPatient) {
      return;
    }

    setSelectedPatient(newPatient);
    setQuery({ ...query, patient: newPatient.id });
  }, [newPatient]);

  return (
    <div className="flex items-center gap-3 h-16 px-3 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-blue-800">
        <User className="h-5 w-5" />
        <div className="text-xs">Patient</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="text-gray-600">
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 animate-pulse" />
            <Skeleton className="h-2 w-32 bg-gray-200 animate-pulse" />
            <Skeleton className="h-2 w-32 bg-gray-200 animate-pulse" />
          </div>
        ) : error || !selectedPatient ? (
          <div className="text-sm font-medium text-gray-600">
            Patient not selected
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <div className="text-sm font-medium">
              {humanName(selectedPatient)}
            </div>
            <div className="flex">
              <div className="text-xs px-1.5 py-0.5 rounded text-blue-800 bg-blue-100">
                {selectedPatient.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientNavProfile;
