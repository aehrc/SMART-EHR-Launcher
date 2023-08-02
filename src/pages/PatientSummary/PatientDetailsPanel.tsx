import PatientTabContent from "./PatientTabContent.tsx";
import { Box } from "@mui/material";
import { Patient } from "fhir/r4";
import PatientEmbeddedHealthCheck from "./PatientTabs/PatientEmbeddedHealthCheck.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";

interface PatientDetailsPanelProps {
  patient: Patient;
  embeddedViewShown: boolean;
}

function PatientDetailsPanel(props: PatientDetailsPanelProps) {
  const { patient, embeddedViewShown } = props;
  const { launch } = useLauncherQuery();

  const launchInEmbeddedView = launch.is_embedded_view;

  return (
    <>
      {!embeddedViewShown ? <PatientTabContent patient={patient} /> : null}
      {launchInEmbeddedView ? (
        <Box sx={{ display: embeddedViewShown ? "block" : "none", mt: 2 }}>
          <PatientEmbeddedHealthCheck />
        </Box>
      ) : null}
    </>
  );
}

export default PatientDetailsPanel;
