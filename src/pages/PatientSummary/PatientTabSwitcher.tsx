import { SyntheticEvent } from "react";
import { Box, styled, Tab } from "@mui/material";
import { TabList } from "@mui/lab";
import { Patient } from "fhir/r4";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface Props {
  patient: Patient | null;
  onToggleEmbeddedViewVisible: (isShown: boolean) => void;
  changeTab: (value: string) => void;
}
function PatientTabSwitcher(props: Props) {
  const { patient, onToggleEmbeddedViewVisible, changeTab } = props;

  const handleTabChange = (_: SyntheticEvent, newValue: string) => {
    changeTab(newValue);
    onToggleEmbeddedViewVisible(false);
  };

  return (
    <Box display="flex">
      <TabList onChange={handleTabChange} disabled={!patient}>
        <StyledTab disableRipple label="Profile" value="1" />
        <StyledTab disableRipple label="Conditions" value="2" />
        <StyledTab disableRipple label="Medications" value="3" />
        <StyledTab disableRipple label="Allergies" value="4" />
        <StyledTab disableRipple label="Procedures" value="5" />
        <StyledTab disableRipple label="Immunisations" value="6" />
        <StyledTab sx={{ display: "none" }} label="Health Check" value="-1" />
      </TabList>
    </Box>
  );
}

export default PatientTabSwitcher;
