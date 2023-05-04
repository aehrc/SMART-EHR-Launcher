import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import type { LaunchParams } from "../../lib/codec.ts";
import { encode } from "../../lib/codec.ts";
import { Box, Button, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getFhirServerBaseUrl } from "../../lib/utils.ts";

const DEFAULT_LAUNCH_PARAMS: LaunchParams = {
  launch_type: "provider-ehr",
  patient: "",
  provider: "",
  encounter: "AUTO",
  skip_login: false,
  skip_auth: false,
  sim_ehr: false,
  scope: "",
  redirect_uris: "",
  client_id: "",
  client_secret: "",
  client_type: "public",
  pkce: "auto",
};

function LaunchButton() {
  // The URL to launch the user-specified app
  let userLaunchUrl: URL | undefined;
  const { query, launch } = useLauncherQuery();

  const { launch_type, sim_ehr } = launch;
  const { launch_url } = query;

  const launchCode = encode({
    ...DEFAULT_LAUNCH_PARAMS,
    launch_type,
    patient: launch.patient,
    provider: launch.provider,
    encounter: "AUTO",
    skip_login: launch.skip_login,
    skip_auth: launch.skip_auth,
    sim_ehr,
    scope: launch.scope,
    redirect_uris: launch.redirect_uris,
    client_id: launch.client_id,
    client_secret: launch.client_secret,
    auth_error: launch.auth_error,
    jwks_url: launch.jwks_url,
    jwks: launch.jwks,
    client_type: launch.client_type,
    pkce: launch.pkce,
    fhir_context: launch.fhir_context,
  });

  // FHIR baseUrl for EHR launches
  const iss = getFhirServerBaseUrl();

  try {
    userLaunchUrl = new URL(launch_url || "", origin);
  } catch {
    userLaunchUrl = new URL("/", origin);
  }
  userLaunchUrl.searchParams.set("iss", iss);
  userLaunchUrl.searchParams.set("launch", launchCode);

  if (sim_ehr) {
    userLaunchUrl = new URL(
      `/ehr?app=${encodeURIComponent(userLaunchUrl.href)}`,
      origin
    );
  }

  const validationErrors = getValidationErrors(launch, query);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button
        href={userLaunchUrl.href}
        variant="contained"
        target="_blank"
        disabled={validationErrors.length > 0}
        endIcon={<ArrowForwardIcon />}
      >
        Launch Health Check Assessment
      </Button>
      {validationErrors.length > 0 ? (
        <Tooltip title={"Invalid app launch URL"}>
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      ) : null}
    </Box>
  );
}

export default LaunchButton;
