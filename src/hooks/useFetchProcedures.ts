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
import { Bundle, Procedure } from "fhir/r4";
import { useContext, useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { getResources } from "@/utils/getResources.ts";
import { TokenContext } from "@/contexts/TokenContext.tsx";

interface useFetchProceduresReturnParams {
  procedures: Procedure[];
  isInitialLoading: boolean;
}

function useFetchProcedures(patientId: string): useFetchProceduresReturnParams {
  const queryUrl = `/Procedure?patient=${patientId}`;

  const { fhirServerToken } = useContext(TokenContext);

  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["procedures" + patientId, queryUrl],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + queryUrl,
        "",
        fhirServerToken
      ),
    { enabled: patientId !== "" }
  );

  const procedures: Procedure[] = useMemo(
    () => getResources<Procedure>(bundle, "Procedure"),
    [bundle]
  );

  return {
    procedures,
    isInitialLoading,
  };
}

export default useFetchProcedures;