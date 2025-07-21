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

import DataTable from "@/components/DataTable.tsx";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";
import useFetchQuestionnaires from "@/hooks/useFetchQuestionnaires.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import {
  createQuestionnaireTableColumns,
  QuestionnaireTableData,
} from "@/utils/dataTable.tsx";
import {
  addOrUpdateFhirContext,
  fhirContextIsQuestionnaireContext,
  parseFhirContext,
  removeFhirContext,
  serializeFhirContext,
} from "@/utils/fhirContext.ts";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { useContext, useMemo } from "react";

function QuestionnaireTable() {
  const { selectedQuestionnaire, setSelectedQuestionnaire } =
    useContext(QuestionnaireContext);
  const { launch, setQuery } = useLauncherQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { questionnaires, isInitialLoading } = useFetchQuestionnaires();

  const questionnaireTableData: QuestionnaireTableData[] = useMemo(() => {
    return questionnaires.map((questionnaire) => ({
      id: questionnaire.id ?? nanoid(),
      name: questionnaire.title ?? "Untitled",
      resourceType: questionnaire.resourceType,
    }));
  }, [questionnaires]);

  const columns = createQuestionnaireTableColumns(
    selectedQuestionnaire,
    handleSetQuestionnaireContext
  );

  function handleSetQuestionnaireContext(id: string) {
    const newQuestionnaire = questionnaires.find(
      (questionnaire) => questionnaire.id === id
    );

    // Get current FHIR contexts as an array
    const currentFhirContexts = parseFhirContext(launch.fhir_context);

    // Questionnaire not found OR questionnaire is already selected, unset questionnaire and context
    if (
      !newQuestionnaire ||
      selectedQuestionnaire?.id === newQuestionnaire.id
    ) {
      setSelectedQuestionnaire(null);

      // Remove any questionnaire contexts from the array
      const updatedContexts = removeFhirContext(
        currentFhirContexts,
        fhirContextIsQuestionnaireContext
      );

      setQuery({
        fhir_context: serializeFhirContext(updatedContexts),
      });
      return;
    }

    // Selected questionnaire lacks a URL, unset questionnaire and context
    if (!newQuestionnaire.url) {
      setSelectedQuestionnaire(null);

      // Remove any questionnaire contexts from the array
      const updatedContexts = removeFhirContext(
        currentFhirContexts,
        fhirContextIsQuestionnaireContext
      );

      setQuery({
        fhir_context: serializeFhirContext(updatedContexts),
      });

      enqueueSnackbar(`Questionnaire ${newQuestionnaire.id} lacks a url`, {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    // Set selected questionnaire and add/update questionnaire context in the array
    let questionnaireCanonical = newQuestionnaire.url;
    if (newQuestionnaire.version) {
      questionnaireCanonical += `|${newQuestionnaire.version}`;
    }

    // Use Australian Digital Health namespace with the "new" role for fhirContext:
    // https://confluence.hl7.org/spaces/FHIRI/pages/202409650/fhirContext+Role+Registry#:~:text=N/A-,http%3A//ns.electronichealth.net.au/smart/role/new,-URL%20made%20more
    const questionnaireFhirContext = {
      role: "http://ns.electronichealth.net.au/smart/role/new",
      type: "Questionnaire",
      canonical: questionnaireCanonical,
    };

    // Add or update the questionnaire context in the array
    const updatedContexts = addOrUpdateFhirContext(
      currentFhirContexts,
      questionnaireFhirContext
    );

    setSelectedQuestionnaire(newQuestionnaire);
    setQuery({
      fhir_context: serializeFhirContext(updatedContexts),
    });
    enqueueSnackbar(`Questionnaire context set. ID:${newQuestionnaire.id} `, {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <DataTable
      data={questionnaireTableData}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedQuestionnaire}
      onClearSelectedData={() => {
        setSelectedQuestionnaire(null);
        const currentFhirContexts = parseFhirContext(launch.fhir_context);
        const updatedContexts = removeFhirContext(
          currentFhirContexts,
          fhirContextIsQuestionnaireContext
        );
        setQuery({
          fhir_context: serializeFhirContext(updatedContexts),
        });
      }}
    />
  );
}

export default QuestionnaireTable;
