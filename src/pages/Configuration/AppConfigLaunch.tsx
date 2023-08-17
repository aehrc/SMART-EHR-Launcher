import {
  Alert,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { getValidationErrors } from "../../lib/URLValidation.tsx";

function AppConfigLaunch() {
  const { setQuery, query, launch } = useLauncherQuery();

  const validationErrors = getValidationErrors(launch, query);

  const launchUrl = query.launch_url;
  const appName = query.app_name;
  const isEmbeddedView = launch.is_embedded_view;

  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" color={grey.A700}>
        App Launch Config
      </Typography>

      <Stack mt={1} rowGap={0.5}>
        <Typography variant="subtitle2">Launch URL</Typography>
        <TextField
          value={launchUrl}
          size="small"
          onChange={(e) => setQuery({ launch_url: e.target.value })}
        />
        {validationErrors.length > 0 ? (
          <Alert severity="error" sx={{ mt: 1 }}>
            {validationErrors[0]}
          </Alert>
        ) : (
          <Alert severity="success" sx={{ mt: 1 }}>
            App Launch URL valid!
          </Alert>
        )}
      </Stack>

      <Stack mt={3} rowGap={0.5}>
        <Typography variant="subtitle2">SMART App Name</Typography>
        <TextField
          value={appName}
          size="small"
          onChange={(e) => setQuery({ app_name: e.target.value })}
        />
        <Typography variant="subtitle2" fontSize={12}>
          This field can contain any value
        </Typography>
      </Stack>

      <Stack mt={3} rowGap={0.5}>
        <Typography variant="subtitle2">
          Launch SMART App in embedded mode?
        </Typography>
        <FormControlLabel
          onChange={(_, checked) => {
            setQuery({ is_embedded_view: checked });
          }}
          checked={isEmbeddedView}
          control={<Switch />}
          label={isEmbeddedView ? "Yes" : "No"}
        />
      </Stack>
    </>
  );
}

export default AppConfigLaunch;
