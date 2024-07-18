import { createContext, ReactNode, useState } from "react";
import { Questionnaire } from "fhir/r4";

interface QuestionnaireContextType {
  selectedQuestionnaire: Questionnaire | null;
  setSelectedQuestionnaire: (selected: Questionnaire | null) => unknown;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType>({
  selectedQuestionnaire: null,
  setSelectedQuestionnaire: () => void 0,
});

const QuestionnaireContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);

  return (
    <QuestionnaireContext.Provider
      value={{ selectedQuestionnaire, setSelectedQuestionnaire }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireContextProvider;
