import { Box, Typography } from "@mui/material";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Bundle, Patient } from "fhir/r4";
import { formatAge, getFhirServerBaseUrl, humanName } from "../../lib/utils.ts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { grey } from "@mui/material/colors";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";

function PatientNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();
  const { setPatient } = useContext(PatientContext);

  const { token } = useContext(TokenContext);

  const patientId = launch.patient;
  const encounterId = launch.encounter;

  const queryEndpoint =
    getFhirServerBaseUrl() + (patientId ? `/Patient/${patientId}` : "/Patient");

  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Patient | Bundle>(
    ["patientProfile", patientId],
    () => fetchResourceFromEHR(queryEndpoint, token ?? ""),
    { enabled: !!token }
  );

  let patient: Patient | null = null;
  if (resource) {
    patient =
      resource.resourceType === "Patient"
        ? resource
        : (resource.entry?.[0]?.resource as Patient);
  }

  useEffect(() => {
    // Define initial questionnaire context in FhirContext
    const questionnaireFhirContext = {
      role: "questionnaire-render-on-launch",
      canonical: "http://www.health.gov.au/assessments/mbs/715|0.1.0-assembled",
      type: "Questionnaire",
    };

    setQuery({
      ...query,
      fhir_context: `${JSON.stringify(questionnaireFhirContext)}`,
    });
  }, []);

  useEffect(() => {
    if (!patient) {
      return;
    }

    setPatient(patient);

    setQuery({
      ...query,
      patient: patient.id,
      launch_url: query.launch_url || "https://smartforms.csiro.au/launch",
      app_name: query.app_name || "Health Check Assessment",
      client_id: launch.client_id || "a57d90e3-5f69-4b92-aa2e-2992180863c1",
      scope:
        launch.scope ||
        "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
      redirect_uris: launch.redirect_uris || "https://smartforms.csiro.au",
      validation: "1",
      is_embedded_view: launch.is_embedded_view || false,
    });
  }, [patient]);

  let encounterSelected = "";
  if (encounterId && encounterId !== "AUTO") {
    encounterSelected = encounterId;
  } else {
    encounterSelected = "No encounter selected";
  }

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <PersonOutlineOutlinedIcon sx={{ fontSize: 30, color: "primary.main" }} />
      <Box fontSize={16} fontWeight="bold" color="primary.main">
        {isLoading ? (
          "Loading patient..."
        ) : error || !patient ? (
          "Patient not selected"
        ) : (
          <>
            <Typography fontSize={16} fontWeight="bold" color="primary.main">
              {humanName(patient)}
            </Typography>
            <Typography fontSize={12} color={grey["500"]}>
              {formatAge(patient)} {patient.gender}
            </Typography>
            <Typography fontSize={12} fontWeight="bold" color={grey["500"]}>
              {encounterSelected}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PatientNavProfile;
