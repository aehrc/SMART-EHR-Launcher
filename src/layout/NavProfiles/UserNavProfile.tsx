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

import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Bundle, Practitioner } from "fhir/r4";
import { humanName } from "../../utils/misc.ts";
import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { UserContext } from "../../contexts/UserContext.tsx";
import { getResource } from "../../utils/getResources.ts";
import { BriefcaseMedical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";

function UserNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();

  const { fhirUser } = useContext(FhirServerContext);
  const { selectedUser, setSelectedUser } = useContext(UserContext);

  let userId = launch.provider ?? "";

  // Always set the userId to fhirUser if it is a Practitioner
  if (fhirUser?.startsWith("Practitioner")) {
    userId = fhirUser.split("/")[1];
  }

  const queryUrl = userId ? `/Practitioner/${userId}` : "/Practitioner";

  const axiosInstance = useFhirServerAxios();
  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Practitioner | Bundle>(
    ["practitionerProfile", userId, queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl)
  );

  const newUser = getResource<Practitioner>(resource, "Practitioner");

  useEffect(() => {
    if (!newUser) {
      return;
    }

    setSelectedUser(newUser);
    setQuery({ ...query, provider: newUser.id });
  }, [newUser]);

  return (
    <div className="flex items-center gap-3 h-16 px-3 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-purple-800">
        <BriefcaseMedical className="h-5 w-5" />
        <div className="text-xs">User</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="text-gray-600">
        {isLoading ? (
          <div>
            <Skeleton className="h-5 w-32 bg-gray-200 animate-pulse" />
          </div>
        ) : error || !selectedUser ? (
          <div className="text-sm font-medium text-gray-600">
            User not selected
          </div>
        ) : (
          <>
            <div className="text-sm font-medium">{humanName(selectedUser)}</div>
            <div className="flex">
              <div className="text-xs px-1.5 py-0.5 rounded text-purple-800 bg-purple-100">
                {selectedUser.id}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserNavProfile;
