import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import FormLink from "@/components/FormLink.tsx";
import {
  getFhirServerBaseUrl,
  getQuestionnaireServerBaseUrl,
} from "@/utils/misc.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useContext } from "react";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";

function SettingsOverview() {
  const { launch } = useLauncherQuery();
  const { selectedQuestionnaire } = useContext(QuestionnaireContext);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Read-only overview of key configurations for the launching
            application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label>Source FHIR Server URL</Label>
              <Input disabled={true} value={getFhirServerBaseUrl()} />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Patient ID</Label>
                <FormLink
                  title="Edit in Patient config"
                  path="/settings/patient"
                />
              </div>
              <Input
                disabled={true}
                value={
                  launch.patient
                    ? `Patient/${launch.patient}`
                    : "Patient not specified"
                }
              />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>User ID</Label>
                <FormLink title="Edit in User config" path="/settings/user" />
              </div>
              <Input
                disabled={true}
                value={
                  launch.provider
                    ? `Practitioner/${launch.provider}`
                    : "User not specified"
                }
              />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Client App URL</Label>
                <FormLink
                  title="Edit in App Launch config"
                  path="/settings/app-launch"
                />
              </div>
              <Input disabled={true} value="https://smartforms.csiro.au" />
            </div>

            <Separator className="my-2" />
            <div className="grid gap-2">
              <Label>Questionnaire Repository Server URL</Label>
              <Input disabled={true} value={getQuestionnaireServerBaseUrl()} />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Questionnaire Context ID (optional)</Label>
                <FormLink
                  title="Edit in Questionnaire context config"
                  path="/settings/questionnaire"
                />
              </div>
              <Input
                disabled={true}
                value={
                  selectedQuestionnaire?.id
                    ? `Questionnaire/${selectedQuestionnaire.id}`
                    : "-"
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsOverview;
