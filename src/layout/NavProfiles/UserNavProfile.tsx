import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { Bundle, Practitioner } from "fhir/r4";
import { getFhirServerBaseUrl, humanName } from "../../utils/misc.ts";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { UserContext } from "../../contexts/UserContext.tsx";
import { getResource } from "../../utils/getResources.ts";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";
import { BriefcaseMedical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

function UserNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();
  const { serverUrl } = useSourceFhirServer();

  const { fhirServerAccessToken } = useContext(TokenContext);
  const { selectedUser, setSelectedUser } = useContext(UserContext);

  let userId = launch.provider ?? "";
  if (!userId && fhirServerAccessToken?.practitioner) {
    userId = fhirServerAccessToken?.practitioner;
  }

  const queryEndpoint =
    getFhirServerBaseUrl() +
    (userId ? `/Practitioner/${userId}` : "/Practitioner");

  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Practitioner | Bundle>(
    ["practitionerProfile", serverUrl, userId],
    () =>
      fetchResourceFromEHR(
        queryEndpoint,
        serverUrl,
        fhirServerAccessToken?.access_token ?? ""
      )
  );

  const newUser = getResource<Practitioner>(resource, "Practitioner");

  useEffect(() => {
    if (!newUser) {
      return;
    }

    setSelectedUser(newUser);
    setQuery({ ...query, provider: newUser.id });
  }, [newUser]);

  return (
    <div className="flex items-center gap-3 h-16 px-3 bg-muted/80 rounded-lg">
      <div className="flex flex-col items-center text-purple-800">
        <BriefcaseMedical className="h-5 w-5" />
        <div className="text-xs">User</div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="text-gray-600">
        {isLoading ? (
          <div>
            <Skeleton className="h-5 w-32 bg-gray-200 animate-pulse" />
          </div>
        ) : error || !selectedUser ? (
          <div className="text-sm font-medium text-red-500">
            User not selected
          </div>
        ) : (
          <>
            <div className="text-sm font-medium">{humanName(selectedUser)}</div>
            <div className="flex">
              <div className="text-xs px-1.5 py-0.5 rounded text-purple-800 bg-purple-100">
                {selectedUser.id}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserNavProfile;
