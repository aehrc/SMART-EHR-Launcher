import useFhirServerAxios from "@/hooks/useFhirServerAxios.ts";
import { useQuery } from "@tanstack/react-query";
import { Bundle } from "fhir/r4";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import {
  fetchAidboxLaunchUri,
  isFetchLaunchUriResponse,
} from "@/api/aidbox.ts";
import { useContext } from "react";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

interface useAidboxFetchLaunchUriReturnParams {
  launchUri: string | null;
  isInitialLoading: boolean;
}

function useAidboxFetchLaunchUri(): useAidboxFetchLaunchUriReturnParams {
  const { sub } = useContext(FhirServerContext);

  const { launch } = useLauncherQuery();

  const clientId = launch.client_id ?? "";
  const launchContext = {
    patient: launch.patient,
    practitioner: launch.provider,
  };

  const launchString = JSON.stringify(launch);

  const axiosInstance = useFhirServerAxios();
  const { data: response, isInitialLoading } = useQuery<Bundle>(
    ["launchUri" + clientId + launchString, "rpc"],
    () =>
      fetchAidboxLaunchUri(axiosInstance, sub ?? "", clientId, launchContext),
    { enabled: typeof sub === "string" }
  );

  const launchUri = isFetchLaunchUriResponse(response)
    ? response.result.uri
    : null;

  return { launchUri: launchUri, isInitialLoading: isInitialLoading };
}

export default useAidboxFetchLaunchUri;
