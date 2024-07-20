import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useContext } from "react";
import { Button } from "@/components/ui/button.tsx";
import QuestionnaireTable from "@/pages/Settings/QuestionnaireSettings/QuestionnaireTable.tsx";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";

function QuestionnaireSettings() {
  const { questionnaireContextEnabled, onEnableQuestionnaireContext } =
    useContext(QuestionnaireContext);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Questionnaire Context</CardTitle>
          <CardDescription>
            Select the Questionnaire to be used as a Questionnaire launch
            context
          </CardDescription>
          {questionnaireContextEnabled ? (
            <QuestionnaireTable />
          ) : (
            <div>
              <div className="flex items-center justify-center m-20">
                <div className=" text-base text-gray-400">{`Connected Source FHIR Server doesn't support Questionnaire context`}</div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={onEnableQuestionnaireContext}
                >
                  Enable anyway (launch may fail or questionnaire context may
                  not work!)
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}

export default QuestionnaireSettings;
