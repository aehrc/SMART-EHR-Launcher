import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { preconfiguredApps } from "@/utils/appLaunch.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";

function AppLaunchAppsSettings() {
  const { query, setQuery } = useLauncherQuery();

  const launchUrl = query.launch_url;

  function handleSelectApp(newLaunchUrl: string) {
    const appConfig = preconfiguredApps.find(
      (app) => app.launch_url === newLaunchUrl
    );

    if (!appConfig) {
      return;
    }

    setQuery({
      app_name: appConfig.app_name,
      launch_url: appConfig.launch_url,
      client_id: appConfig.client_id,
      scope: appConfig.scope,
      redirect_uris: appConfig.redirect_uris,
      is_embedded_view: appConfig.is_embedded_view,
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
        <Label>Pre-configured Apps</Label>
        <div className="grid gap-1">
          <div className="flex items-center gap-x-1">
            <Select value={launchUrl ?? ""} onValueChange={handleSelectApp}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {preconfiguredApps.map((app) => (
                  <SelectItem key={app.launch_url} value={app.launch_url}>
                    {app.app_name}
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
