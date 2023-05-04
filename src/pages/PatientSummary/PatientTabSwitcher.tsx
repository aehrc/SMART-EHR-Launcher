import { SyntheticEvent } from "react";
import { Box, styled, Tab } from "@mui/material";
import { TabList } from "@mui/lab";
import { Patient } from "fhir/r4";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface Props {
  patient: Patient | null;
  changeTab: (value: string) => void;
}
function PatientTabSwitcher(props: Props) {
  const { patient, changeTab } = props;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    changeTab(newValue);
  };

  return (
    <Box display="flex" padding="0 2rem">
      <TabList onChange={handleChange} disabled={!patient}>
        <StyledTab disableRipple label="Profile" value="1" />
        <StyledTab disableRipple label="Conditions" value="2" />
        <StyledTab disableRipple label="Medications" value="3" />
        <StyledTab disableRipple label="Allergies" value="4" />
        <StyledTab disableRipple label="Procedures" value="5" />
        <StyledTab disableRipple label="Immunisations" value="6" />
      </TabList>
    </Box>
  );
}

export default PatientTabSwitcher;
