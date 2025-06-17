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

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card.tsx";

interface AppConfigInterfaceHoverCardProps {
  children: ReactNode;
}

function AppConfigInterfaceHoverCard(props: AppConfigInterfaceHoverCardProps) {
  const { children } = props;

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">AppConfig Interface</h4>
          <div className="text-xs font-mono bg-muted p-3 rounded-md space-y-1">
            <div className="text-muted-foreground">
              {"export interface AppConfig {"}
            </div>
            <div className="ml-2 space-y-0.5">
              <div>
                <span className="text-blue-600">appName</span>:{" "}
                <span className="text-green-600">string</span>
              </div>
              <div>
                <span className="text-blue-600">launchUrl</span>:{" "}
                <span className="text-green-600">string</span>
              </div>
              <div>
                <span className="text-blue-600">clientId</span>:{" "}
                <span className="text-green-600">string</span>
              </div>
              <div>
                <span className="text-blue-600">scope</span>:{" "}
                <span className="text-green-600">string</span>
              </div>
              <div>
                <span className="text-blue-600">redirectUris</span>:{" "}
                <span className="text-green-600">string</span>
              </div>
              <div>
                <span className="text-blue-600">isEmbeddedView</span>:{" "}
                <span className="text-green-600">boolean</span>
              </div>
            </div>
            <div className="text-muted-foreground">{"}"}</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default AppConfigInterfaceHoverCard;
