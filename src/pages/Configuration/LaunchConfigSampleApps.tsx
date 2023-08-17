import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";

const sampleAppConfigs = [
  {
    app_name: "Health Check Assessment",
    launch_url: "https://www.smartforms.io/launch",
    client_id: "9cbba311-bf9b-4200-8dd3-8459046fc522",
    scope:
      "fhirUser online_access openid profile patient/Condition.read patient/Observation.read launch patient/Encounter.read patient/QuestionnaireResponse.read patient/QuestionnaireResponse.write patient/Patient.read",
    redirect_uris: "https://www.smartforms.io",
    is_embedded_view: false,
  },
  {
    app_name: "Smart Forms Dev",
    launch_url: "http://127.0.0.1:5173/launch",
    client_id: "a57d90e3-5f69-4b92-aa2e-2992180863c",
    scope:
      "fhirUser online_access openid profile patient/Condition.read patient/Observation.read launch patient/Encounter.read patient/QuestionnaireResponse.read patient/QuestionnaireResponse.write patient/Patient.read",
    redirect_uris: "http://127.0.0.1:5173/",
    is_embedded_view: false,
  },
  {
    app_name: "Pediatric Growth Chart Application",
    launch_url:
      "http://examples.smarthealthit.org/growth-chart-app/launch.html",
    client_id: "growth_chart",
    scope:
      "openid profile launch patient/Observation.read patient/Patient.read offline_access",
    redirect_uris: "http://examples.smarthealthit.org/growth-chart-app",
    is_embedded_view: true,
  },
];

function LaunchConfigSampleApps() {
  const { setQuery, query } = useLauncherQuery();

  function handleSelectApp(e: SelectChangeEvent) {
    const appConfig = sampleAppConfigs.find(
      (app) => app.launch_url === e.target.value
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

  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" color={grey.A700}>
        Sample Apps
      </Typography>

      <Stack mt={1} rowGap={0.5}>
        <FormControl fullWidth>
          <Select
            value={query.launch_url ?? ""}
            size="small"
            onChange={handleSelectApp}
          >
            {sampleAppConfigs.map((app) => (
              <MenuItem key={app.launch_url} value={app.launch_url}>
                {app.app_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="subtitle2" fontSize={12}>
          Select a sample app to launch, or manually configure your app. Above
          will be empty if manual configuration is performed.
        </Typography>
      </Stack>
    </>
  );
}

export default LaunchConfigSampleApps;
