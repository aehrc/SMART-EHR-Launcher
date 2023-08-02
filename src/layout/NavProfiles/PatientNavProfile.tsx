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
    if (!patient) {
      return;
    }

    setPatient(patient);

    // Define initial questionnaire context in FhirContext
    const questionnaireFhirContext = {
      role: "questionnaire-render-on-launch",
      canonical: "http://www.health.gov.au/assessments/mbs/715|0.1.0-assembled",
      type: "Questionnaire",
    };

    setQuery({
      ...query,
      patient: patient.id,
      launch_url: query.launch_url || "https://www.smartforms.io/launch",
      client_id: launch.client_id || "9cbba311-bf9b-4200-8dd3-8459046fc522",
      scope:
        launch.scope ||
        "launch online_access fhirUser openid profile user/Patient.read user/Practitioner.read user/QuestionnaireResponse.read user/QuestionnaireResponse.write patient/Condition.read patient/Encounter.read patient/Observation.read",
      redirect_uris: launch.redirect_uris || "https://www.smartforms.io",
      validation: "1",
      fhir_context:
        launch.fhir_context || `${JSON.stringify(questionnaireFhirContext)}`,
      is_embedded_view: launch.is_embedded_view || false,
    });
  }, [patient]);

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
            <Typography fontSize={12} fontWeight="bold" color={grey["500"]}>
              {formatAge(patient)} {patient.gender}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PatientNavProfile;
