import { Box, Typography } from "@mui/material";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Bundle, Practitioner } from "fhir/r4";
import { getFhirServerBaseUrl, humanName } from "../../lib/utils.ts";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";

function UserNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();

  const { token } = useContext(TokenContext);

  const userId = launch.provider;

  const queryEndpoint =
    getFhirServerBaseUrl() +
    (userId ? `/Practitioner/${userId}` : "/Practitioner");

  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Practitioner | Bundle>(
    ["practitionerProfile", userId],
    () => fetchResourceFromEHR(queryEndpoint, token ?? ""),
    { enabled: !!token }
  );

  let user: Practitioner | null = null;
  if (resource) {
    user =
      resource.resourceType === "Practitioner"
        ? resource
        : (resource.entry?.[0]?.resource as Practitioner);
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    setQuery({ ...query, provider: user.id });
  }, [user]);

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <MedicalInformationOutlinedIcon sx={{ fontSize: 30, color: "#2d6da5" }} />
      <Typography fontSize={16} fontWeight="bold" color="primary.main">
        {isLoading
          ? "Loading user..."
          : error || !user
          ? "User not selected"
          : humanName(user)}
      </Typography>
    </Box>
  );
}

export default UserNavProfile;
