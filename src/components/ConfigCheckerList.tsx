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
  isValidOAuthClientId,
  isValidOAuthGrantType,
  isValidOAuthScope,
} from "@/utils/configFile.ts";
import ConfigCheckerListItem from "@/components/ConfigCheckerListItem.tsx";
import ConfigCheckerAppList from "@/components/ConfigCheckerAppList.tsx";
import ConfigCheckerProgress from "@/components/ConfigCheckerProgress.tsx";

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

  const mandatoryConfigItems: ConfigCheckerItem[] = [
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

  const optionalConfigItems: ConfigCheckerItem[] = [
    ...(config.oAuthGrantType !== undefined
      ? [
          {
            label: "OAuth Grant Type",
            isValid: isValidOAuthGrantType(config.oAuthGrantType),
            description: `Set value: ${
              (config.oAuthGrantType as never) === ""
                ? "<empty string>"
                : config.oAuthGrantType
            }`,
            type: '"authorization_code" | null',
          },
        ]
      : []),
    ...(config.oAuthScope !== undefined
      ? [
          {
            label: "OAuth Scope",
            isValid: isValidOAuthScope(config.oAuthScope),
            description: `Set value: ${
              config.oAuthScope === "" ? "<empty string>" : config.oAuthScope
            }`,
            type: "string | null",
          },
        ]
      : []),
    ...(config.oAuthClientId !== undefined
      ? [
          {
            label: "OAuth Client ID",
            isValid: isValidOAuthClientId(config.oAuthClientId),
            description: `Set value: ${
              config.oAuthClientId === ""
                ? "<empty string>"
                : config.oAuthClientId
            }`,
            type: "string | null",
          },
        ]
      : []),
  ];

  const mandatoryValidCount = mandatoryConfigItems.filter(
    (item) => item.isValid
  ).length;
  const mandatoryTotalCount = mandatoryConfigItems.length;
  const optionalValidCount = optionalConfigItems.filter(
    (item) => item.isValid
  ).length;
  const optionalTotalCount = optionalConfigItems.length;

  return (
    <div className="space-y-6">
      {/* Mandatory Configuration */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Mandatory Configuration</h3>
        </div>
        <ConfigCheckerProgress
          totalCount={mandatoryTotalCount}
          validCount={mandatoryValidCount}
        />
        <div className="space-y-0 border rounded-lg">
          {mandatoryConfigItems.map((item, index) => {
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

      {/* Optional Configuration */}
      {optionalConfigItems.length ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Optional Configuration</h3>
          </div>
          <ConfigCheckerProgress
            validCount={optionalValidCount}
            totalCount={optionalTotalCount}
          />
          <div className="space-y-0 border rounded-lg">
            {optionalConfigItems.map((item, index) => (
              <ConfigCheckerListItem
                key={index}
                label={item.label}
                isValid={item.isValid}
                type={item.type}
                description={item.description}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ConfigCheckerList;
