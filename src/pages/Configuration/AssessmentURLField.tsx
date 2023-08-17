import {
  Alert,
  Box,
  Card,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { grey } from "@mui/material/colors";
import LaunchConfigSampleApps from "./LaunchConfigSampleApps.tsx";

function AssessmentUrlField() {
  const { launch, query, setQuery } = useLauncherQuery();

  const validationErrors = getValidationErrors(launch, query);

  const launchUrl = query.launch_url;
  const appName = query.app_name;
  const isEmbeddedView = launch.is_embedded_view;
  const redirectUris = launch.redirect_uris ?? "";
  const scopes = launch.scope ?? "";
  const clientId = launch.client_id ?? "";

  return (
    <Card sx={{ p: 3 }}>
      <LaunchConfigSampleApps />
      <Box mt={4}>
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
      </Box>

      <Box mt={4}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={grey.A700}
            sx={{ mb: 1 }}
          >
            Client Identity Validation
          </Typography>
          {/*<NotImplementedText>Validation not implemented</NotImplementedText>*/}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Client ID</Typography>
            <TextField
              value={clientId}
              fullWidth
              sx={{ my: 0.5 }}
              size="small"
              onChange={(e) => setQuery({ client_id: e.target.value })}
            />
            <Typography variant="subtitle2" fontSize={12}>
              If you provide a Client ID, your <code>client_id</code> at runtime
              must match
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Allowed Scopes</Typography>
            <TextField
              value={scopes}
              fullWidth
              sx={{
                my: 0.5,
              }}
              multiline
              size="small"
              onChange={(e) => setQuery({ scope: e.target.value })}
            />
            <Typography variant="subtitle2" fontSize={12}>
              Space-separated list of scopes that your app is allowed to
              request. If provided, your <code>scope</code> at runtime must be
              covered by this set.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Allowed Redirect URIs</Typography>
            <TextField
              value={redirectUris}
              fullWidth
              sx={{ my: 0.5 }}
              size="small"
              onChange={(e) => setQuery({ redirect_uris: e.target.value })}
            />
            <Typography variant="subtitle2" fontSize={12}>
              Comma-separated list of redirect URIs. If provided, your{" "}
              <code>redirect_uri</code> must be included in this set.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default AssessmentUrlField;
