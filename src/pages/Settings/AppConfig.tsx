import { Card, Divider } from "@mui/material";
import AppConfigSampleApps from "./AppConfigSampleApps.tsx";
import AppConfigLaunch from "./AppConfigLaunch.tsx";
import AppConfigClientIdentity from "./AppConfigClientIdentity.tsx";

function AppConfig() {
  return (
    <Card sx={{ p: 3 }}>
      <AppConfigSampleApps />
      <Divider sx={{ my: 2.5 }} />
      <AppConfigLaunch />
      <Divider sx={{ my: 2.5 }} />
      <AppConfigClientIdentity />
    </Card>
  );
}

export default AppConfig;
