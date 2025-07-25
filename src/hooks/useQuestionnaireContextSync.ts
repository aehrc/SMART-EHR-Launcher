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

import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import {
  findQuestionnaireContext,
  parseFhirContext,
} from "@/utils/fhirContext.ts";
import useFormsServerAxios from "@/hooks/useFormsServerAxios.ts";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getFirstResource } from "@/utils/getResources.ts";
import { Questionnaire } from "fhir/r4";

export function useQuestionnaireContextSync() {
  const { setSelectedQuestionnaire, questionnaireContextEnabled } =
    useContext(QuestionnaireContext);

  const { launch } = useLauncherQuery();

  const fhirContextArray = parseFhirContext(launch.fhir_context);
  const questionnaireContext = findQuestionnaireContext(fhirContextArray);
  const questionnaireCanonical = questionnaireContext?.canonical || "";

  const queryUrl = `/Questionnaire?url=${questionnaireCanonical}`;
  const axiosInstance = useFormsServerAxios();
  const { data: questionnaire } = useQuery(
    ["questionnaireCanonical", queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl),
    {
      enabled: questionnaireContextEnabled && questionnaireCanonical !== "",
    }
  );

  const newQuestionnaire = getFirstResource<Questionnaire>(
    questionnaire,
    "Questionnaire"
  );

  useEffect(() => {
    if (!newQuestionnaire) {
      return;
    }

    setSelectedQuestionnaire(newQuestionnaire);
  }, [newQuestionnaire, setSelectedQuestionnaire]);
}
