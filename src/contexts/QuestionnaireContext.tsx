import { createContext, ReactNode, useState } from "react";
import { Questionnaire } from "fhir/r4";
import useSupportQuestionnaireContext from "@/hooks/useSupportQuestionnaireContext.ts";

interface QuestionnaireContextType {
  selectedQuestionnaire: Questionnaire | null;
  questionnaireContextEnabled: boolean;
  setSelectedQuestionnaire: (selected: Questionnaire | null) => unknown;
  onEnableQuestionnaireContext: () => unknown;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType>({
  selectedQuestionnaire: null,
  questionnaireContextEnabled: false,
  setSelectedQuestionnaire: () => void 0,
  onEnableQuestionnaireContext: () => void 0,
});

const QuestionnaireContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const isSupported = useSupportQuestionnaireContext();

  const [questionnaireContextEnabled, setQuestionnaireContextEnabled] =
    useState(isSupported);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);

  if (isSupported && isSupported !== questionnaireContextEnabled) {
    setQuestionnaireContextEnabled(isSupported);
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        selectedQuestionnaire,
        questionnaireContextEnabled,
        setSelectedQuestionnaire,
        onEnableQuestionnaireContext: () => {
          setQuestionnaireContextEnabled(true);
        },
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireContextProvider;
