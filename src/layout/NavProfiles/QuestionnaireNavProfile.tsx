import { FileText } from "lucide-react";
import { useContext, useEffect } from "react";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { fhirContextIsQuestionnaireContext } from "@/utils/fhirContext.ts";
import { useQuery } from "@tanstack/react-query";
import { Bundle, Questionnaire } from "fhir/r4";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import useFormsServerAxios from "@/hooks/useFormsServerAxios.ts";
import { getFirstResource } from "@/utils/getResources.ts";

function QuestionnaireNavProfile() {
  const {
    selectedQuestionnaire,
    setSelectedQuestionnaire,
    questionnaireContextEnabled,
  } = useContext(QuestionnaireContext);

  const { launch } = useLauncherQuery();

  const fhirContext = launch.fhir_context;
  let questionnaireCanonical = "";
  if (fhirContext) {
    try {
      // Decoding the JSON string into a JavaScript object
      const fhirContextJson = JSON.parse(fhirContext);
      if (fhirContextIsQuestionnaireContext(fhirContextJson)) {
        questionnaireCanonical = fhirContextJson.canonical;
      }
    } catch (error) {
      // Handle any errors that occur during parsing
      console.error("Error parsing JSON:", error);
    }
  }

  const queryUrl = `/Questionnaire?url=${questionnaireCanonical}`;
  const axiosInstance = useFormsServerAxios();
  const { data: questionnaire } = useQuery<Bundle>(
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
  }, [newQuestionnaire]);

  const questionnaireSelected =
    selectedQuestionnaire && selectedQuestionnaire.id
      ? selectedQuestionnaire.id
      : "Not selected";

  if (!questionnaireContextEnabled) {
    return null;
  }

  return (
    <div className="flex items-center gap-2.5 h-16 px-2.5 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-green-700">
        <FileText className="h-5 w-5" />
        <div className="text-xs">Questionnaire</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="flex">
        {questionnaireSelected === "Not selected" ? (
          <div className="text-xs font-medium text-gray-600">
            {questionnaireSelected}
          </div>
        ) : (
          <div className="text-xs px-1.5 py-0.5 rounded text-green-800 bg-green-100">
            {questionnaireSelected}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionnaireNavProfile;
