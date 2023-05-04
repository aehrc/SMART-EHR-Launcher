import { Patient } from "fhir/r4";
import { Box, Typography } from "@mui/material";

interface Props {
  address: Patient["address"];
}

function PatientAddress(props: Props) {
  const { address } = props;

  return (
    <>
      {address?.map((address, index) => (
        <Box key={index}>
          {address.line?.map((line, index) => (
            <Typography key={index}>{line}</Typography>
          ))}
          <Typography>{address.city}</Typography>
          <Typography>
            {address.postalCode} {address.state}
          </Typography>
        </Box>
      ))}
    </>
  );
}

export default PatientAddress;
