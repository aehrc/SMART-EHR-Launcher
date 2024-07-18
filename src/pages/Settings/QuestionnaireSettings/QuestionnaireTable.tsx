/*
 * Copyright 2023 Commonwealth Scientific and Industrial Research
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

import { useContext } from "react";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";
import useFetchQuestionnaires from "@/hooks/useFetchQuestionnaires.ts";
import { createQuestionnaireTableColumns } from "@/utils/dataTable.tsx";
import DataTable from "@/components/DataTable.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { useSnackbar } from "notistack";

function QuestionnaireTable() {
  const { selectedQuestionnaire, setSelectedQuestionnaire } =
    useContext(QuestionnaireContext);
  const { setQuery } = useLauncherQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { questionnaires, isInitialLoading } = useFetchQuestionnaires();

  const columns = createQuestionnaireTableColumns(
    selectedQuestionnaire,
    handleSetQuestionnaireContext
  );

  function handleSetQuestionnaireContext(id: string) {
    const newQuestionnaire = questionnaires.find(
      (questionnaire) => questionnaire.id === id
    );

    // Questionnaire not found OR questionnaire is already selected, unset questionnaire and context
    if (
      !newQuestionnaire ||
      selectedQuestionnaire?.id === newQuestionnaire.id
    ) {
      setSelectedQuestionnaire(null);
      setQuery({
        fhir_context: "",
      });
      return;
    }

    // Selected questionnaire lacks a URL, unset questionnaire and context
    if (!newQuestionnaire.url) {
      setSelectedQuestionnaire(null);
      setQuery({
        fhir_context: "",
      });
      enqueueSnackbar(`Questionnaire context set. ID:${newQuestionnaire.id} `, {
        variant: "success",
        autoHideDuration: 3000,
      });
      return;
    }

    // Set selected questionnaire and set query
    const questionnaireFhirContext = {
      role: "questionnaire-render-on-launch",
      canonical: newQuestionnaire.url,
      type: "Questionnaire",
    };

    setSelectedQuestionnaire(newQuestionnaire);
    setQuery({
      fhir_context: `${JSON.stringify(questionnaireFhirContext)}`,
    });
    enqueueSnackbar(`Questionnaire context set. ID:${newQuestionnaire.id} `, {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <DataTable
      data={questionnaires}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedQuestionnaire}
    />
  );
}

export default QuestionnaireTable;