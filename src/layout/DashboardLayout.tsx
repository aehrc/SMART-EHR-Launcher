import { Box, Card, Stack, styled, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar.tsx";
import DashboardSidebar from "./DashboardSideBar.tsx";
import { getFhirServerBaseUrl } from "../lib/utils.ts";
import useSourceFhirServer from "../hooks/useSourceFhirServer.ts";
import useLoadResources from "../hooks/useLoadResources.ts";

// styled components

export const LayoutRoot = styled(Box)({
  display: "flex",
  minHeight: "100%",
  overflowY: "scroll",
});

const Wrapper = styled(Box)({
  width: `calc(100% - 80px)`,
  maxWidth: 1400,
  margin: "auto",
  paddingLeft: 80,
  height: "100vh",
});

function DashboardLayout() {
  const { serverUrl } = useSourceFhirServer();

  useLoadResources();

  return (
    <LayoutRoot>
      <DashboardSidebar />
      <Wrapper>
        <DashboardNavbar />
        <Box mt={2} mb={4}>
          <Outlet />

          <Stack mx={10} alignItems="center">
            <Card>
              <Box p={2}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  Server Details
                </Typography>
                <Typography variant="subtitle2">
                  Proxy FHIR Server: <b>{getFhirServerBaseUrl()}</b>
                </Typography>
                <Typography variant="subtitle2">
                  Actual FHIR Server: <b>{serverUrl}</b> (Configurable in
                  Configuration —&gt; Source FHIR Server)
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Box>
      </Wrapper>
    </LayoutRoot>
  );
}

export default DashboardLayout;
