import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";
import { grey } from "@mui/material/colors";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import { verifyFhirServer } from "../../api/verifyFhirServer.ts";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { enqueueSnackbar } from "notistack";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { Patient, Practitioner } from "fhir/r4";
import { UserContext } from "../../contexts/UserContext.tsx";
import { getPatient, getPractitioner } from "../../utils/getResources.ts";

function SourceFhirServerConfig() {
  const { serverUrl, updateServerUrl } = useSourceFhirServer();

  const { query, setQuery } = useLauncherQuery();
  const { setSelectedPatient } = useContext(PatientContext);
  const { setSelectedUser } = useContext(UserContext);

  const { token } = useContext(TokenContext);

  const [serverUrlInput, setServerUrlInput] = useState(serverUrl);
  const [serverUrlInputValid, setServerUrlInputValid] = useState<
    boolean | "unchecked"
  >(true);

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Event handlers
  async function handleVerifyFHIRServer() {
    setFeedbackMessage("Validating URL...");
    const { isValidFhirServer, feedbackMessage } = await verifyFhirServer(
      serverUrlInput
    );

    if (isValidFhirServer) {
      setServerUrlInputValid(true);
      setFeedbackMessage("URL validated");
      return;
    }

    // URL not valid
    setServerUrlInputValid(false);
    setFeedbackMessage(
      feedbackMessage.slice(0, 1).toUpperCase() + feedbackMessage.slice(1)
    );
  }

  function handleServerUrlInputChange(event: ChangeEvent<HTMLInputElement>) {
    setServerUrlInput(event.target.value);
    setServerUrlInputValid("unchecked");
    setFeedbackMessage(
      "URL unvalidated. Click on the question mark to validate."
    );
  }

  async function handleSetFhirServerUrl() {
    const newPatient = await handleFetchPatient();
    const newUser = await handleFetchUser();

    if (!newPatient || !newUser) {
      enqueueSnackbar(
        `HTTP response to new server succeeded but unable to fetch a Patient or Practitioner. FHIR server unchanged.`,
        {
          variant: "error",
        }
      );
    }
    console.log(newPatient);
    console.log(newUser);

    updateServerUrl(serverUrlInput);
    setSelectedPatient(newPatient);
    setSelectedUser(newUser);
    setQuery({
      ...query,
      patient: newPatient?.id,
      provider: newUser?.id,
      source_fhir_server: serverUrlInput,
    });
  }

  async function handleFetchPatient(): Promise<Patient | null> {
    const newServerUrl = serverUrlInput.endsWith("/")
      ? serverUrlInput
      : serverUrlInput + "/";
    const patientResponse = await fetchResourceFromEHR(
      newServerUrl + "Patient",
      "",
      token ?? ""
    );

    if (!patientResponse) {
      enqueueSnackbar(
        `HTTP response to new server failed. FHIR server unchanged.`,
        {
          variant: "error",
        }
      );
      return null;
    }

    const newPatient = getPatient(patientResponse);
    if (!newPatient) {
      return null;
    }

    if (newPatient.resourceType !== "Patient" || !newPatient.id) {
      return null;
    }

    return newPatient;
  }

  async function handleFetchUser(): Promise<Practitioner | null> {
    const newServerUrl = serverUrlInput.endsWith("/")
      ? serverUrlInput
      : serverUrlInput + "/";
    const userResponse = await fetchResourceFromEHR(
      newServerUrl + "Practitioner",
      "",
      token ?? ""
    );

    if (!userResponse) {
      enqueueSnackbar(
        `HTTP response to new server failed. FHIR server unchanged.`,
        {
          variant: "error",
        }
      );
      return null;
    }

    console.log(userResponse);
    const newUser = getPractitioner(userResponse);
    if (!newUser) {
      return null;
    }

    if (newUser.resourceType !== "Practitioner" || !newUser.id) {
      return null;
    }

    return newUser;
  }

  const setFhirServerButtonIsEnabled =
    serverUrlInput !== serverUrl && serverUrlInputValid === true;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" color={grey.A700}>
        Source FHIR Server
      </Typography>
      <Stack mt={1} rowGap={0.5}>
        <Typography variant="subtitle2">Source FHIR Server URL</Typography>
        <TextField
          value={serverUrlInput}
          size="small"
          error={serverUrlInputValid === false}
          helperText={feedbackMessage ?? ""}
          onChange={handleServerUrlInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {serverUrlInputValid === true ? (
                  <VerifiedIcon color="success" fontSize="small" />
                ) : null}

                {serverUrlInputValid === false ? (
                  <ErrorIcon color="error" fontSize="small" />
                ) : null}

                {serverUrlInputValid === "unchecked" ? (
                  <Tooltip title="Validate URL">
                    <IconButton
                      data-test="validate-url-button-playground"
                      onClick={handleVerifyFHIRServer}
                    >
                      <QuestionMarkIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box display="flex" mt={0.5} columnGap={1} alignItems="center">
        <Typography variant="subtitle2" fontSize={13}>
          Note: On setting the FHIR Server URL, the current <b>user</b>,{" "}
          <b>patient</b> and
          <b> encounter</b> will be reset to the first respective resources
          available in the new FHIR server.
        </Typography>
        <Box flexGrow={1} />
        <Button
          variant="outlined"
          size="small"
          disabled={!setFhirServerButtonIsEnabled}
          data-test="set-fhir-server-button-playground"
          onClick={handleSetFhirServerUrl}
        >
          Set as FHIR Server URL
        </Button>
      </Box>
    </Card>
  );
}

export default SourceFhirServerConfig;
