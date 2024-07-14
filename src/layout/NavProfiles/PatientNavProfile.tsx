import { Box, Typography } from "@mui/material";
import { formatAge, getFhirServerBaseUrl, humanName } from "../../lib/utils.ts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { grey } from "@mui/material/colors";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { Bundle, Patient } from "fhir/r4";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { getPatient } from "../../utils/getResources.ts";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";

function PatientNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();
  const { serverUrl } = useSourceFhirServer();

  const { token } = useContext(TokenContext);
  const { patient, setPatient } = useContext(PatientContext);

  const patientId = launch.patient;
  const encounterId = launch.encounter;

  const queryEndpoint =
    getFhirServerBaseUrl() + (patientId ? `/Patient/${patientId}` : "/Patient");

  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Patient | Bundle>(
    ["patientProfile", serverUrl, patientId],
    () => fetchResourceFromEHR(queryEndpoint, serverUrl, token ?? ""),
    { enabled: token !== null }
  );

  const newPatient = getPatient(resource);

  let encounterSelected = "";
  if (encounterId && encounterId !== "AUTO") {
    encounterSelected = encounterId;
  } else {
    encounterSelected = "No encounter selected";
  }

  useEffect(() => {
    if (!newPatient) {
      return;
    }

    setPatient(newPatient);
    setQuery({ ...query, patient: newPatient.id });
  }, [newPatient]);

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
