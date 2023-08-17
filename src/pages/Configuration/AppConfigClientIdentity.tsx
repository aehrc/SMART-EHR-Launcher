import { Grid, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";

function AppConfigClientIdentity() {
  const { launch, setQuery } = useLauncherQuery();

  const redirectUris = launch.redirect_uris ?? "";
  const scopes = launch.scope ?? "";
  const clientId = launch.client_id ?? "";

  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color={grey.A700}
        sx={{ mb: 1 }}
      >
        Client Identity Validation
      </Typography>

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
            Space-separated list of scopes that your app is allowed to request.
            If provided, your <code>scope</code> at runtime must be covered by
            this set.
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
    </>
  );
}

export default AppConfigClientIdentity;
