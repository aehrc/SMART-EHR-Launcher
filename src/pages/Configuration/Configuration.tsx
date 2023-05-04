import { Box, Card } from "@mui/material";
import useTitle from "../../hooks/useTitle.ts";
// import PractitionerTable from "./PractitionerTable";
import { TabContext, TabPanel } from "@mui/lab";
import { useState } from "react";
import ConfigurationTabSwitcher from "./ConfigurationTabSwitcher.tsx";
import PatientTable from "./PatientTable.tsx";
import QuestionnaireTable from "./QuestionnaireTable.tsx";
import AssessmentUrlField from "./AssessmentURLField.tsx";
import PractitionerTable from "./PractitionerTable.tsx";

function Configuration() {
  useTitle("Configuration");

  const [value, setValue] = useState("1");

  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <Card>
          <ConfigurationTabSwitcher changeTab={(value) => setValue(value)} />
        </Card>

        <Box marginTop={3} sx={{ width: "100%" }}>
          <TabPanel value="1" sx={{ p: 0 }}>
            <PractitionerTable />
          </TabPanel>

          <TabPanel value="2" sx={{ p: 0 }}>
            <PatientTable />
          </TabPanel>

          <TabPanel value="3" sx={{ p: 0 }}>
            <QuestionnaireTable />
          </TabPanel>

          <TabPanel value="4" sx={{ p: 0 }}>
            <AssessmentUrlField />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default Configuration;
