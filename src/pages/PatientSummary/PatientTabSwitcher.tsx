import { SyntheticEvent } from "react";
import {
  Box,
  Fade,
  styled,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { TabList } from "@mui/lab";
import { Patient } from "fhir/r4";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface Props {
  patient: Patient | null;
  embeddedViewLaunched: boolean;
  embeddedViewIsVisible: boolean;
  onToggleEmbeddedViewVisible: (isShown: boolean) => void;
  changeTab: (value: string) => void;
}
function PatientTabSwitcher(props: Props) {
  const {
    patient,
    embeddedViewLaunched,
    embeddedViewIsVisible,
    onToggleEmbeddedViewVisible,
    changeTab,
  } = props;

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    changeTab(newValue);
    onToggleEmbeddedViewVisible(false);
  };

  const handleShowEmbeddedView = () => {
    changeTab("-1");
    onToggleEmbeddedViewVisible(true);
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
      <Fade in={embeddedViewLaunched}>
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
            sx={{ textTransform: "capitalize" }}
          >
            Embedded Health Check
          </ToggleButton>
        </ToggleButtonGroup>
      </Fade>
    </Box>
  );
}

export default PatientTabSwitcher;
