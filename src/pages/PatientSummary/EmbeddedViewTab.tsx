import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { getValidationErrors } from "../../lib/URLValidation.tsx";

interface EmbeddedViewTabProps {
  embeddedViewLaunched: boolean;
  embeddedViewIsVisible: boolean;
  onToggleEmbeddedViewVisible: (isShown: boolean) => void;
  onChangePatientTab: (value: string) => void;
}

function EmbeddedViewTab(props: EmbeddedViewTabProps) {
  const { query, launch } = useLauncherQuery();

  const {
    embeddedViewIsVisible,
    onToggleEmbeddedViewVisible,
    onChangePatientTab,
  } = props;

  const handleShowEmbeddedView = () => {
    onChangePatientTab("-1");
    onToggleEmbeddedViewVisible(true);
  };

  const validationErrors = getValidationErrors(launch, query);
  const isEmbeddedView = launch.is_embedded_view;

  if (!isEmbeddedView) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" columnGap={1}>
      <ToggleButtonGroup
        color="primary"
        value={embeddedViewIsVisible ? "embedded" : null}
        exclusive
        onChange={handleShowEmbeddedView}
      >
        <ToggleButton
          value="embedded"
          size="small"
          disableRipple
          disabled={validationErrors.length > 0}
          sx={{ textTransform: "capitalize" }}
        >
          {query.app_name}
        </ToggleButton>
      </ToggleButtonGroup>

      {validationErrors.length > 0 ? (
        <Tooltip title={"Invalid app launch URL"}>
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      ) : null}
    </Box>
  );
}

export default EmbeddedViewTab;
