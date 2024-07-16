import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Box, Button, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { getAuCoreTestServerLaunchUrl } from "../../lib/launchUrl.ts";

function LaunchButton() {
  // The URL to launch the user-specified app
  const { query, launch } = useLauncherQuery();

  const userLaunchUrl = getAuCoreTestServerLaunchUrl(query, launch);

  const isEmbeddedView = launch.is_embedded_view;
  const appName = query.app_name;

  const validationErrors = getValidationErrors(launch, query);

  if (isEmbeddedView) {
    return null;
  }

  let questionnaireContextUrl = "";
  try {
    if (launch.fhir_context) {
      const questionnaireContext = JSON.parse(launch.fhir_context);
      questionnaireContextUrl = questionnaireContext.canonical;
    }
  } catch (e) {
    console.error(e);
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
      {questionnaireContextUrl !== "" ? (
        <Tooltip
          title={`Questionnaire context set: ${questionnaireContextUrl}`}
        >
          <ArticleOutlinedIcon color="info" />
        </Tooltip>
      ) : null}
      {validationErrors.length > 0 ? (
        <Tooltip title={"Invalid app launch URL"}>
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      ) : null}
    </Box>
  );
}

export default LaunchButton;
