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

import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppConfigInterfaceHoverCard from "@/components/AppConfigInterfaceHoverCard.tsx";

interface ConfigCheckerListItemProps {
  label: string;
  isValid: boolean;
  type: string;
  description?: string;
}

function ConfigCheckerListItem(props: ConfigCheckerListItemProps) {
  const { label, isValid, type, description } = props;

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b last:border-b-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{label}</span>
          {type === "AppConfig" ? (
            <AppConfigInterfaceHoverCard>
              <Badge variant="secondary" className="text-xs cursor-help">
                {type}
              </Badge>
            </AppConfigInterfaceHoverCard>
          ) : (
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{description}</span>
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
  );
}

export default ConfigCheckerListItem;
