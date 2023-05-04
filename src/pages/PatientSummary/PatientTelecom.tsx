import { Patient } from "fhir/r4";
import { Box, Typography } from "@mui/material";

interface Props {
  telecom: Patient["telecom"];
}

function PatientTelecom(props: Props) {
  const { telecom } = props;

  return (
    <>
      {telecom?.map((telecom, index) => (
        <Box key={index}>
          <Typography>{telecom.value}</Typography>
        </Box>
      ))}
    </>
  );
}

export default PatientTelecom;
