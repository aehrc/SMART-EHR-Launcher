import { Box, Card } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { Patient } from "fhir/r4";
import PatientConditions from "./PatientTabs/PatientConditions.tsx";
import PatientProcedures from "./PatientTabs/PatientProcedures.tsx";
import PatientImmunizations from "./PatientTabs/PatientImmunizations.tsx";
import PatientAllergies from "./PatientTabs/PatientAllergies.tsx";
import PatientMedications from "./PatientTabs/PatientMedications.tsx";
import PatientProfile from "./PatientTabs/PatientProfile.tsx";

interface Props {
  patient: Patient;
}

function PatientTabContent(props: Props) {
  const { patient } = props;

  const patientId: string = patient.id!;

  return (
    <Box marginTop={2} sx={{ width: "100%" }}>
      <Card sx={{ height: "100%", width: "100%" }}>
        <TabPanel value="1">
          <PatientProfile patient={patient} />
        </TabPanel>
        <TabPanel value="2">
          <PatientConditions patientId={patientId} />
        </TabPanel>
        <TabPanel value="3">
          <PatientMedications patientId={patientId} />
        </TabPanel>
        <TabPanel value="4">
          <PatientAllergies patientId={patientId} />
        </TabPanel>
        <TabPanel value="5">
          <PatientProcedures patientId={patientId} />
        </TabPanel>
        <TabPanel value="6">
          <PatientImmunizations patientId={patientId} />
        </TabPanel>
      </Card>
    </Box>
  );
}

export default PatientTabContent;
