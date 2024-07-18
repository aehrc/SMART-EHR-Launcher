import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import useUnlockQuestionnaireSettings from "@/hooks/useUnlockQuestionnaireSettings.ts";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import QuestionnaireTable from "@/pages/Settings/QuestionnaireSettings/QuestionnaireTable.tsx";

function QuestionnaireSettings() {
  const questionnaireScopePresent = useUnlockQuestionnaireSettings();

  const [isUnlocked, setIsUnlocked] = useState(questionnaireScopePresent);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Questionnaire Context</CardTitle>
          <CardDescription>
            Select the Questionnaire to be used as a Questionnaire launch
            context
          </CardDescription>
          <div className="pt-2">
            {isUnlocked ? (
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
                    onClick={() => {
                      setIsUnlocked(true);
                    }}
                  >
                    Enable anyway (launch may fail or questionnaire context may
                    not work!)
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default QuestionnaireSettings;
