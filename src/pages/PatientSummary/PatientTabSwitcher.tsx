import { SyntheticEvent } from "react";
import {
  Box,
  styled,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { TabList } from "@mui/lab";
import { Patient } from "fhir/r4";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface Props {
  patient: Patient | null;
  embeddedViewShown: boolean;
  onToggleEmbeddedView: (isShown: boolean) => void;
  changeTab: (value: string) => void;
}
function PatientTabSwitcher(props: Props) {
  const { patient, embeddedViewShown, onToggleEmbeddedView, changeTab } = props;

  const { launch } = useLauncherQuery();

  const launchInEmbeddedView = launch.is_embedded_view;

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    changeTab(newValue);
    onToggleEmbeddedView(false);
  };

  const handleShowEmbeddedView = () => {
    changeTab("-1");
    onToggleEmbeddedView(true);
  };

  return (
    <Box
      display="flex"
      padding="0 2rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <TabList onChange={handleTabChange} disabled={!patient}>
        <StyledTab disableRipple label="Profile" value="1" />
        <StyledTab disableRipple label="Conditions" value="2" />
        <StyledTab disableRipple label="Medications" value="3" />
        <StyledTab disableRipple label="Allergies" value="4" />
        <StyledTab disableRipple label="Procedures" value="5" />
        <StyledTab disableRipple label="Immunisations" value="6" />
        <StyledTab sx={{ display: "none" }} label="Health Check" value="-1" />
      </TabList>
      {launchInEmbeddedView ? (
        <ToggleButtonGroup
          color="primary"
          value={embeddedViewShown ? "embedded" : null}
          exclusive
          onChange={handleShowEmbeddedView}
        >
          <ToggleButton
            value="embedded"
            size="small"
            disableRipple
            sx={{ textTransform: "capitalize" }}
          >
            Health Check
          </ToggleButton>
        </ToggleButtonGroup>
      ) : null}
    </Box>
  );
}

export default PatientTabSwitcher;
