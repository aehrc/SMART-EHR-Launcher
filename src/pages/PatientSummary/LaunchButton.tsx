import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Box, Button, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getUserLaunchUrl } from "../../lib/launchUrl.ts";

function LaunchButton() {
  // The URL to launch the user-specified app
  const { query, launch } = useLauncherQuery();

  const userLaunchUrl = getUserLaunchUrl(query, launch);

  const isEmbeddedView = launch.is_embedded_view;
  const appName = query.app_name;

  const validationErrors = getValidationErrors(launch, query);

  if (isEmbeddedView) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button
        href={userLaunchUrl.href}
        variant="contained"
        target="_blank"
        disabled={validationErrors.length > 0}
        endIcon={<ArrowForwardIcon />}
      >
        Launch {appName}
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
