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
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useContext } from "react";
import { QuestionnaireContext } from "@/contexts/QuestionnaireContext.tsx";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import useConfig from "@/hooks/useConfig.ts";

function SettingsOverview() {
  const { launch } = useLauncherQuery();

  const { fhirServerUrl, formsServerUrl } = useConfig();

  const { selectedQuestionnaire } = useContext(QuestionnaireContext);

  let { fhirUser } = useContext(FhirServerContext);

  // Disabled user switching if fhirUser is Practitioner.
  // This makes it so that a logged in practitioner User cannot switch users.
  const userSwitchingDisabled = fhirUser
    ? fhirUser?.startsWith("Practitioner")
    : false;
  fhirUser = fhirUser ? fhirUser.replace("Practitioner/", "") : "";

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
              <Input disabled={true} value={fhirServerUrl} />
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
                {userSwitchingDisabled ? (
                  <div className="text-xs text-muted-foreground">
                    Logged in as{" "}
                    <span className="text-xs px-1.5 py-0.5 rounded text-purple-800 bg-purple-100">
                      {fhirUser}
                    </span>
                  </div>
                ) : (
                  <FormLink title="Edit in User config" path="/settings/user" />
                )}
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
              <Input disabled={true} value={formsServerUrl} />
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
