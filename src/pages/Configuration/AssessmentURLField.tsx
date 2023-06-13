import { Alert, Box, Card, Grid, TextField, Typography } from "@mui/material";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { NotImplementedText } from "./AssessmentURLField.styles.ts";
import { grey } from "@mui/material/colors";

function AssessmentUrlField() {
  const { launch, query, setQuery } = useLauncherQuery();

  const validationErrors = getValidationErrors(launch, query);

  const launchUrl = query.launch_url;
  const redirectUris = launch.redirect_uris ?? "";
  const scopes = launch.scope ?? "";
  const clientId = launch.client_id ?? "";

  return (
    <Card sx={{ p: 3 }}>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color={grey.A700}
          sx={{ mb: 1 }}
        >
          App Launch Url
        </Typography>
        <TextField
          value={launchUrl}
          sx={{ width: "100%" }}
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
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={grey.A700}
            sx={{ mb: 1 }}
          >
            Client Identity Validation
          </Typography>
          <NotImplementedText>Validation not implemented</NotImplementedText>
        </Box>

        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Client ID</Typography>
            <TextField
              value={clientId}
              fullWidth
              sx={{ my: 0.5 }}
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
