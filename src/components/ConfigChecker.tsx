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

import { ConfigFile } from "@/utils/configFile.ts";
import Header from "@/components/Header.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import Footer from "@/components/ui/Footer.tsx";
import ConfigCheckerList from "@/components/ConfigCheckerList.tsx";

interface ConfigListProps {
  config: Partial<ConfigFile>;
}

function ConfigChecker(props: ConfigListProps) {
  const { config } = props;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header>
          <div className="h-16" />
        </Header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
          <div className="mx-auto grid w-full max-w-6xl gap-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>⚠️ Configuration File Invalid </CardTitle>
                  <CardDescription>
                    Review your config.json. Missing or invalid items are marked
                    with an X.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConfigCheckerList config={config} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}

export default ConfigChecker;
