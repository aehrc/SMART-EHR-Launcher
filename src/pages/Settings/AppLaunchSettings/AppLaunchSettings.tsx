import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import AppLaunchAppsSettings from "@/pages/Settings/AppLaunchSettings/AppLaunchAppsSettings.tsx";
import { getValidationErrors } from "@/lib/URLValidation.tsx";
import Alert from "@/components/Alert.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";

function AppLaunchSettings() {
  const { query, launch, setQuery } = useLauncherQuery();

  const validationErrors = getValidationErrors(launch, query);

  const launchUrl = query.launch_url;
  const appName = query.app_name;
  const isEmbeddedView = launch.is_embedded_view;

  const clientId = launch.client_id ?? "";
  const scopes = launch.scope ?? "";
  const redirectUris = launch.redirect_uris ?? "";

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>App Launch</CardTitle>
          <CardDescription>
            Configure the client application's SMART App Launch configuration
            and scopes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            {/* Pre-configured apps */}
            <AppLaunchAppsSettings />

            <Separator className="my-1" />

            {/* App Launch Config */}
            <div className="grid gap-2">
              <Label>Launch URL</Label>
              <div className="grid gap-1">
                <Input
                  value={launchUrl}
                  onChange={(e) => setQuery({ launch_url: e.target.value })}
                />
                {validationErrors.length > 0 ? (
                  <Alert variant="danger">{validationErrors[0]}</Alert>
                ) : (
                  <Alert variant="success">App Launch URL valid!</Alert>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>SMART App Name</Label>
              <div className="grid gap-1">
                <Input
                  value={appName}
                  onChange={(e) => setQuery({ app_name: e.target.value })}
                />
                <div className="text-xs text-muted-foreground">
                  This field can contain any value
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <div className="flex flex-row items-center justify-between rounded-lg border p-3.5">
                <div className="space-y-0.5">
                  <Label>Embedded mode</Label>
                  <div className="text-xs text-muted-foreground">
                    Launch SMART App in embedded mode within this EHR window
                  </div>
                </div>
                <Switch
                  checked={isEmbeddedView}
                  onCheckedChange={(checked) => {
                    setQuery({ is_embedded_view: checked });
                  }}
                />
              </div>
              {isEmbeddedView ? (
                <Alert variant="info">
                  Some unsecured sites (HTTP) could fail to run in embedded
                  mode. If that happens, a white screen is displayed.
                </Alert>
              ) : null}
            </div>

            <Separator className="my-2" />

            {/* Client Identity Validation */}
            <div className="grid gap-2">
              <Label>Client ID</Label>
              <div className="grid gap-1">
                <Input
                  value={clientId}
                  onChange={(e) => setQuery({ client_id: e.target.value })}
                />
                <div className="text-xs text-muted-foreground">
                  If you provide a Client ID, your <code>client_id</code> at
                  runtime must match
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Allowed Scopes</Label>
              <div className="grid gap-1">
                <Textarea
                  value={scopes}
                  onChange={(e) => setQuery({ scope: e.target.value })}
                />
                <div className="text-xs text-muted-foreground">
                  Space-separated list of scopes that your app is allowed to
                  request. If provided, your <code>scope</code> at runtime must
                  be covered by this set.
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Allowed Redirect URIs</Label>
              <div className="grid gap-1">
                <Textarea
                  value={redirectUris}
                  onChange={(e) => setQuery({ redirect_uris: e.target.value })}
                />
                <div className="text-xs text-muted-foreground">
                  Comma-separated list of redirect URIs. If provided, your{" "}
                  <code>redirect_uri</code> must be included in this set.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AppLaunchSettings;
