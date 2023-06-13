import { createContext, ReactNode, useState } from "react";

interface QuestionnaireContextType {
  questionnaireId: string;
  setQuestionnaireId: (newQuestionnaireId: string) => unknown;
}

export const QuestionnaireContext = createContext<QuestionnaireContextType>({
  questionnaireId: "",
  setQuestionnaireId: () => void 0,
});

// props types for provider
type ProviderProps = {
  children: ReactNode;
};

const QuestionnaireContextProvider = ({ children }: ProviderProps) => {
  const [id, setId] = useState("AboriginalTorresStraitIslanderHealthCheck");

  return (
    <QuestionnaireContext.Provider
      value={{ questionnaireId: id, setQuestionnaireId: setId }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireContextProvider;
