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
  appConfigIsValid,
  ConfigFile,
  isValidAppList,
  isValidAuthRequired,
  isValidFhirServerUrl,
  isValidLaunchParamConfigType,
} from "@/utils/configFile.ts";
import ConfigCheckerListItem from "@/components/ConfigCheckerListItem.tsx";
import ConfigCheckerAppList from "@/components/ConfigCheckerAppList.tsx";

export interface ConfigCheckerItem {
  label: string;
  isValid: boolean;
  type: string;
  description: string;
}

interface ConfigCheckerListProps {
  config: Partial<ConfigFile>;
}

function ConfigCheckerList(props: ConfigCheckerListProps) {
  const { config } = props;

  const configItems: ConfigCheckerItem[] = [
    {
      label: "FHIR Server URL",
      isValid: isValidFhirServerUrl(config.fhirServerUrl),
      type: "string",
      description:
        config.fhirServerUrl ||
        "FHIR server for Patient record data not configured",
    },
    {
      label: "Authorization Required",
      isValid: isValidAuthRequired(config.authRequired),
      type: "boolean",
      description:
        typeof config.authRequired === "boolean"
          ? config.authRequired.toString()
          : "Authorization setting not configured",
    },
    {
      label: "Launch Parameter Config Type",
      isValid: isValidLaunchParamConfigType(config.launchParamConfigType),
      type: '"default" | "proxy"',
      description: config.launchParamConfigType
        ? `Using ${config.launchParamConfigType} configuration`
        : "Launch parameter configuration type not set",
    },
    {
      label: "Forms Server URL",
      isValid: isValidFhirServerUrl(config.formsServerUrl),
      type: "string",
      description:
        config.formsServerUrl ||
        "FHIR server for Questionnaire definitions not configured",
    },
    {
      label: "App List",
      isValid: isValidAppList(config.appList),
      type: "AppConfig[]",
      description:
        config.appList && config.appList.length > 0
          ? `${config.appList.length} app(s) configured: ${config.appList
              .map((app) => app.appName)
              .join(", ")}`
          : "No applications configured in app list",
    },
    {
      label: "Default App",
      isValid: appConfigIsValid(config.defaultApp),
      type: "AppConfig",
      description: config.defaultApp?.appName
        ? `Default app: ${config.defaultApp.appName}`
        : "Default application not configured",
    },
  ];

  const validCount = configItems.filter((item) => item.isValid).length;
  const totalCount = configItems.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Configuration Status: {validCount}/{totalCount} items configured
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${(validCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.round((validCount / totalCount) * 100)}%
          </span>
        </div>
      </div>
      <div className="space-y-0">
        {configItems.map((item, index) => {
          if (item.label === "App List") {
            return (
              <ConfigCheckerAppList
                key={index}
                label={item.label}
                appList={config.appList || []}
                isValid={item.isValid}
                type={item.type}
                description={item.description}
              />
            );
          }

          return (
            <ConfigCheckerListItem
              key={index}
              label={item.label}
              isValid={item.isValid}
              type={item.type}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ConfigCheckerList;
