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
import type { Bundle, Questionnaire } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getQuestionnaireServerBaseUrl } from "@/utils/misc.ts";

interface useFetchQuestionnairesReturnParams {
  questionnaires: Questionnaire[];
  isInitialLoading: boolean;
}

function useFetchQuestionnaires(): useFetchQuestionnairesReturnParams {
  const numOfSearchEntries = 200;

  let queryUrl = `/Questionnaire?_count=${numOfSearchEntries}&_sort=-date&`;

  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["questionnaires" + numOfSearchEntries.toString(), queryUrl],
    () =>
      fetchResourceFromEHR(getQuestionnaireServerBaseUrl() + queryUrl, "", "")
  );

  const questionnaires: Questionnaire[] = useMemo(
    () => getQuestionnaires(bundle),
    [bundle]
  );

  return {
    questionnaires,
    isInitialLoading,
  };
}

function getQuestionnaires(bundle: Bundle | undefined): Questionnaire[] {
  if (!bundle || !bundle.entry || bundle.entry.length === 0) return [];

  return bundle.entry.map(
    (entry) => entry.resource as Questionnaire // non-questionnaire resources are filtered
  );
}

export default useFetchQuestionnaires;
