import { Box, Card, Divider, Typography } from "@mui/material";
import useLauncherQuery from "../../../hooks/useLauncherQuery.ts";
import { getUserLaunchUrl } from "../../../lib/launchUrl.ts";

function PatientEmbeddedHealthCheck() {
  const { query, launch } = useLauncherQuery();

  const userLaunchUrl = getUserLaunchUrl(query, launch);

  return (
    <Card sx={{ height: "100%", width: "100%", p: 3 }}>
      <Typography fontSize={18} fontWeight="bold">
        {query.app_name}
      </Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Box display="flex" justifyContent="center">
        <iframe
          src={userLaunchUrl.href}
          width="100%"
          height="100%"
          style={{
            border: "1px solid #F5F5F5",
            minWidth: "675px",
            minHeight: "500px",
          }}
        />
      </Box>
    </Card>
  );
}

export default PatientEmbeddedHealthCheck;
