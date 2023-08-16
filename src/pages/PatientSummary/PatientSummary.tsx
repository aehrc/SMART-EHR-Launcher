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
import PatientTabSwitcher from "./PatientTabSwitcher.tsx";
import PatientDetailsPanel from "./PatientDetailsPanel.tsx";
import EmbeddedViewTab from "./EmbeddedViewTab.tsx";

function PatientSummary() {
  useTitle("Patient Summary");

  const { patient } = useContext(PatientContext);

  const [tabValue, setTabValue] = useState("1");
  const [embeddedViewLaunched, setEmbeddedViewLaunched] = useState(false);
  const [embeddedViewIsVisible, setEmbeddedViewIsVisible] = useState(false);

  return (
    <Box pt={2} pb={4}>
      <TabContext value={tabValue}>
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
          <Box display="flex" padding="0 1.5rem">
            <PatientTabSwitcher
              patient={patient}
              onToggleEmbeddedViewVisible={(isShown) => {
                if (!embeddedViewLaunched) {
                  setEmbeddedViewLaunched(true);
                }

                setEmbeddedViewIsVisible(isShown);
              }}
              changeTab={(value) => setTabValue(value)}
            />
            <Box flexGrow={1} />
            <EmbeddedViewTab
              embeddedViewLaunched={embeddedViewLaunched}
              embeddedViewIsVisible={embeddedViewIsVisible}
              onToggleEmbeddedViewVisible={(isShown) => {
                if (!embeddedViewLaunched) {
                  setEmbeddedViewLaunched(true);
                }

                setEmbeddedViewIsVisible(isShown);
              }}
              onChangePatientTab={(value) => setTabValue(value)}
            />
          </Box>
        </Card>
        {patient ? (
          <PatientDetailsPanel
            patient={patient}
            embeddedViewLaunched={embeddedViewLaunched}
            embeddedViewIsVisible={embeddedViewIsVisible}
          />
        ) : null}
      </TabContext>
    </Box>
  );
}

export default PatientSummary;
