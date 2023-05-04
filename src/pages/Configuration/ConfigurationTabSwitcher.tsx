import { SyntheticEvent } from "react";
import { Box, styled, Tab } from "@mui/material";
import { TabList } from "@mui/lab";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface Props {
  changeTab: (value: string) => void;
}
function ConfigurationTabSwitcher(props: Props) {
  const { changeTab } = props;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    changeTab(newValue);
  };

  return (
    <Box display="flex" padding="0 2rem">
      <TabList onChange={handleChange}>
        <StyledTab disableRipple label="Current user" value="1" />
        <StyledTab disableRipple label="Current patient" value="2" />
        <StyledTab disabled disableRipple label="Current questionnaire" value="3" />
        <StyledTab disableRipple label="App Launch URL" value="4" />
      </TabList>
    </Box>
  );
}

export default ConfigurationTabSwitcher;