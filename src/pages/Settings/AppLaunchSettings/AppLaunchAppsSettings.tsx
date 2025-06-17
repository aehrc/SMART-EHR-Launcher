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

import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";
import useConfig from "@/hooks/useConfig.ts";

function AppLaunchAppsSettings() {
  const { query, setQuery } = useLauncherQuery();

  const { appList } = useConfig();

  const launchUrl = query.launch_url;

  function handleSelectApp(newLaunchUrl: string) {
    const appConfig = appList.find((app) => app.launchUrl === newLaunchUrl);

    if (!appConfig) {
      return;
    }

    setQuery({
      app_name: appConfig.appName,
      launch_url: appConfig.launchUrl,
      client_id: appConfig.clientId,
      scope: appConfig.scope,
      redirect_uris: appConfig.redirectUris,
      is_embedded_view: appConfig.isEmbeddedView,
    });
  }

  function handleClearField() {
    setQuery({
      app_name: "",
      launch_url: "",
      client_id: "",
      scope: "",
      redirect_uris: "",
      is_embedded_view: false,
    });
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>Pre-configured Apps (from config.json)</Label>
        <div className="grid gap-1">
          <div className="flex items-center gap-x-1">
            <Select value={launchUrl ?? ""} onValueChange={handleSelectApp}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {appList.map((app) => (
                  <SelectItem key={app.launchUrl} value={app.launchUrl}>
                    {app.appName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearField}
              className="h-8 px-2 lg:px-3"
            >
              Clear
              <X className="ml-1 mt-0.5 h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Select a pre-configured app or manually configure your app by
            clearing the field
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLaunchAppsSettings;
