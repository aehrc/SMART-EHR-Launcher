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

import { useState } from "react";
import { AppConfig, appConfigIsValid } from "@/utils/configFile.ts";
import { Check, ChevronDown, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppConfigInterfaceHoverCard from "@/components/AppConfigInterfaceHoverCard.tsx";

interface ConfigCheckerAppListProps {
  label: string;
  appList: AppConfig[];
  isValid: boolean;
  description: string;
  type: string;
}

function ConfigCheckerAppList(props: ConfigCheckerAppListProps) {
  const { label, appList, isValid, description, type } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 hover:bg-muted rounded py-1 px-1.5 -ml-1"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              <span className="font-medium text-sm">{label}</span>
            </button>
            <AppConfigInterfaceHoverCard>
              <Badge variant="secondary" className="text-xs cursor-help">
                {type}
              </Badge>
            </AppConfigInterfaceHoverCard>
          </div>
          <span className="text-xs text-muted-foreground ml-4">
            {description}
          </span>
        </div>
        <div className="flex items-center">
          {isValid ? (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span className="text-xs font-medium">Valid</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600">
              <X className="h-4 w-4" />
              <span className="text-xs font-medium">Invalid</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapsible App List */}
      {isExpanded && appList && appList.length > 0 && (
        <div className="ml-4 pb-2">
          {appList.map((app, index) => {
            const isAppValid = appConfigIsValid(app);
            return (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 pl-4 pr-6 border-b border-muted last:border-b-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-xs">
                    {app.appName || `Unnamed App ${index + 1}`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isAppValid
                      ? "All fields configured"
                      : "Missing required fields"}
                  </span>
                </div>
                <div className="flex items-center">
                  {isAppValid ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <X className="h-3 w-3 text-red-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConfigCheckerAppList;
