import { Alert, Card, TextField, Typography } from "@mui/material";
import { getValidationErrors } from "../../lib/URLValidation.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";

function AssessmentUrlField() {
  const { launch, query, setQuery } = useLauncherQuery();

  const validationErrors = getValidationErrors(launch, query);
  const launch_url = query.launch_url;

  return (
    <Card sx={{ p: 3 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="#808080"
        sx={{ mb: 1 }}
      >
        App Launch Url
      </Typography>
      <TextField
        value={launch_url}
        sx={{ width: "100%" }}
        onChange={(e) => setQuery({ launch_url: e.target.value })}
      />
      {validationErrors.length > 0 ? (
        <Alert severity="error" sx={{ mt: 1 }}>
          {validationErrors[0]}
        </Alert>
      ) : (
        <Alert severity="success" sx={{ mt: 1 }}>
          App Launch URL valid!
        </Alert>
      )}
    </Card>
  );
}

export default AssessmentUrlField;
