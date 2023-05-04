import { Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import { formatAge, humanName } from "../../../lib/utils.ts";
import PatientTelecom from "../PatientTelecom.tsx";
import PatientAddress from "../PatientAddress.tsx";
import { Patient } from "fhir/r4";

interface Props {
  patient: Patient;
}

function PatientProfile(props: Props) {
  const { patient } = props;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Patient Profile
      </Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />

      <Grid container rowGap={2}>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Patient ID</Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography>{patient.id}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Name</Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography>{humanName(patient)}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Gender</Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography textTransform="capitalize">{patient.gender}</Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Age</Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography textTransform="capitalize">
            {formatAge(patient)}
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Date of Birth</Typography>
        </Grid>
        <Grid item sm={9}>
          <Typography textTransform="capitalize">
            {patient.birthDate
              ? moment(patient.birthDate).format("DD/MM/YYYY")
              : "Unknown"}
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Contact</Typography>
        </Grid>
        <Grid item sm={9}>
          <PatientTelecom telecom={patient.telecom} />
        </Grid>
        <Grid item sm={3}>
          <Typography fontWeight="bold">Address</Typography>
        </Grid>
        <Grid item sm={9}>
          <PatientAddress address={patient.address} />
        </Grid>
      </Grid>
    </>
  );
}

export default PatientProfile;
