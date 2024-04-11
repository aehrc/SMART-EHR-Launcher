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
    launch_url: "https://smartforms.csiro.au/launch",
    client_id: "a57d90e3-5f69-4b92-aa2e-2992180863c1",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "https://smartforms.csiro.au",
    is_embedded_view: false,
  },
  {
    app_name: "Pediatric Growth Chart",
    launch_url:
      "http://examples.smarthealthit.org/growth-chart-app/launch.html",
    client_id: "growth_chart",
    scope:
      "openid profile launch patient/Observation.read patient/Patient.read offline_access",
    redirect_uris: "http://examples.smarthealthit.org/growth-chart-app",
    is_embedded_view: false,
  },
  {
    app_name: "SMART Australian Tester",
    launch_url:
      "https://smartqedit4.azurewebsites.net/ts/Tester/smart-launch.html",
    client_id: "16cbfe7c-6c56-4876-944f-534f9306bf8b",
    scope:
      "openid profile patient/Patient.read patient/Flag.read user/Practitioner.read user/PractitionerRole.read user/Organization.read launch",
    redirect_uris:
      "https://smartqedit4.azurewebsites.net/ts/Tester/smart-index.html",
    is_embedded_view: true,
  },
  {
    app_name: "Smart Forms Dev Build",
    launch_url: "http://localhost:5173/launch",
    client_id: "1ff7bdc2-36b2-4303-8c05-c57342c5b043",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "http://localhost:5173/",
    is_embedded_view: false,
  },
  {
    app_name: "SMART on FHIR Problem List Demo",
    launch_url: "https://main-vite.d2gc21b6xr8ukx.amplifyapp.com/launch",
    client_id: "a5403f19-3b1c-4f19-b298-cc42e8c3a9c0",
    scope:
      "fhirUser online_access openid profile launch patient/Patient.rs patient/Encounter.cruds patient/Condition.cruds",
    redirect_uris: "https://main-vite.d2gc21b6xr8ukx.amplifyapp.com/",
    is_embedded_view: false,
  },
  {
    app_name: "Manually configured SMART app",
    launch_url: "",
    client_id: "",
    scope: "",
    redirect_uris: "",
    is_embedded_view: false,
  },
];

function AppConfigSampleApps() {
  const { setQuery, query } = useLauncherQuery();

  const launchUrl = query.launch_url;

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
            value={launchUrl ?? ""}
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

export default AppConfigSampleApps;
