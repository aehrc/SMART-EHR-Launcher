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
import { getFhirServerBaseUrl } from "../../lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SmartConfiguration {
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string[];
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  introspection_endpoint: string;
  code_challenge_methods_supported: string[];
  scopes_supported: string[];
  response_types_supported: string[];
  capabilities: string[];
}

function Configuration() {
  useTitle("Configuration");

  const [value, setValue] = useState("1");

  const smartConfigurationEndpoint =
    getFhirServerBaseUrl() + "/.well-known/smart-configuration";

  const { data } = useQuery(["smart-configuration"], () =>
    axios(smartConfigurationEndpoint).then((res) => res.data)
  );

  let scopes: string[] = [];
  if (data) {
    try {
      const smartConfiguration = data as SmartConfiguration;
      scopes = smartConfiguration.scopes_supported;
    } catch (e) {
      console.error(e);
    }
  }

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
            <AssessmentUrlField />
          </TabPanel>

          <TabPanel value="4" sx={{ p: 0 }}>
            <QuestionnaireTable
              disabled={!scopes.includes("launch/questionnaire")}
            />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default Configuration;
