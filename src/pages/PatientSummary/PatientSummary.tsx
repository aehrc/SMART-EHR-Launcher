import { Box, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import useTitle from "../../hooks/useTitle.ts";
import { TabContext } from "@mui/lab";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { formatAge, humanName } from "../../lib/utils.ts";
import moment from "moment/moment";
import LaunchButton from "./LaunchButton.tsx";
import { grey } from "@mui/material/colors";
import PatientTabContent from "./PatientTabContent.tsx";
import PatientTabSwitcher from "./PatientTabSwitcher.tsx";

function PatientSummary() {
  useTitle("Patient Summary");

  const { patient } = useContext(PatientContext);

  const [value, setValue] = useState("1");

  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <Card>
          <Box sx={{ height: 150, width: "100%", p: 4 }}>
            {patient ? (
              <Box display="flex" gap={4}>
                <Box sx={{ py: 0.5 }}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 60 }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {humanName(patient)}
                  </Typography>
                  <Typography>
                    {patient.birthDate
                      ? moment(patient.birthDate).format("DD/MM/YYYY")
                      : "Unknown"}
                  </Typography>
                  <Typography color={grey["700"]}>
                    {formatAge(patient)} {patient.gender}
                  </Typography>
                </Box>

                <Box flexGrow={1} />
                <LaunchButton />
              </Box>
            ) : (
              <>Loading Patient...</>
            )}
          </Box>

          <PatientTabSwitcher
            patient={patient}
            changeTab={(value) => setValue(value)}
          />
        </Card>
        {patient ? <PatientTabContent patient={patient} /> : null}
      </TabContext>
    </Box>
  );
}

export default PatientSummary;
