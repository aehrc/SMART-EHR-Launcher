import PatientTabContent from "./PatientTabContent.tsx";
import { Box } from "@mui/material";
import { Patient } from "fhir/r4";
import PatientEmbeddedHealthCheck from "./PatientTabs/PatientEmbeddedHealthCheck.tsx";

interface PatientDetailsPanelProps {
  patient: Patient;
  embeddedViewLaunched: boolean;
  embeddedViewIsVisible: boolean;
}

function PatientDetailsPanel(props: PatientDetailsPanelProps) {
  const { patient, embeddedViewLaunched, embeddedViewIsVisible } = props;

  return (
    <>
      {!embeddedViewIsVisible ? <PatientTabContent patient={patient} /> : null}
      {embeddedViewLaunched ? (
        <Box sx={{ display: embeddedViewIsVisible ? "block" : "none", mt: 2 }}>
          <PatientEmbeddedHealthCheck />
        </Box>
      ) : null}
    </>
  );
}

export default PatientDetailsPanel;
