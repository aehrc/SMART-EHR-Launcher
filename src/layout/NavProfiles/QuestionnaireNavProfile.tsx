import { FileText } from "lucide-react";
import { useContext } from "react";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";

function QuestionnaireNavProfile() {
  const { selectedQuestionnaire, questionnaireContextEnabled } =
    useContext(QuestionnaireContext);

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
