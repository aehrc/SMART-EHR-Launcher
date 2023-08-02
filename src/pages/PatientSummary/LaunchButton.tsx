import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Box, Button, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getUserLaunchUrl } from "../../lib/launchUrl.ts";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";

interface LaunchButtonProps {
  embeddedViewLaunched: boolean;
  onLaunchEmbeddedView: () => void;
}

function LaunchButton(props: LaunchButtonProps) {
  const { embeddedViewLaunched, onLaunchEmbeddedView } = props;

  // The URL to launch the user-specified app
  const { query, launch } = useLauncherQuery();

  const userLaunchUrl = getUserLaunchUrl(query, launch);

  const isEmbeddedView = launch.is_embedded_view;

  const validationErrors = getValidationErrors(launch, query);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {isEmbeddedView ? (
        <Button
          variant="contained"
          onClick={onLaunchEmbeddedView}
          disabled={validationErrors.length > 0 || embeddedViewLaunched}
          endIcon={<PictureInPictureIcon />}
        >
          Show Embedded Health Check Assessment
        </Button>
      ) : (
        <Button
          href={userLaunchUrl.href}
          variant="contained"
          target="_blank"
          disabled={validationErrors.length > 0}
          endIcon={<ArrowForwardIcon />}
        >
          Launch Health Check Assessment
        </Button>
      )}
      {validationErrors.length > 0 ? (
        <Tooltip title={"Invalid app launch URL"}>
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      ) : null}
    </Box>
  );
}

export default LaunchButton;
