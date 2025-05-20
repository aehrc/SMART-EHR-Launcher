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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import QuestionnaireTable from "@/pages/Settings/QuestionnaireSettings/QuestionnaireTable.tsx";

function Presets() {
  console.log(window.location.href);
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Presets</CardTitle>
          <CardDescription>
            Pre-configured sets of launch contexts
          </CardDescription>

          <QuestionnaireTable />
        </CardHeader>
      </Card>
    </div>
  );
}

export default Presets;
