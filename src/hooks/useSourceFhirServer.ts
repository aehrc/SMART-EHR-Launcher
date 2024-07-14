import { useContext } from "react";
import { SourceFhirServerContext } from "../contexts/SourceFhirServerContext.tsx";
import { fetchResourceFromEHR } from "../api/fhirApi.ts";
import { PROXY_SERVER_URL } from "../lib/utils.ts";
import { useQuery } from "@tanstack/react-query";

export function useSourceFhirServer() {
  const { serverUrl, isModified, setServerUrl, setIsModified } = useContext(
    SourceFhirServerContext
  );

  useQuery(
    ["defaultServerUrl"],
    () =>
      fetchResourceFromEHR(PROXY_SERVER_URL + "/fhir_server_r4", serverUrl, ""),
    {
      onSuccess: (res) => {
        if (responseIsFhirServerR4(res)) {
          setServerUrl(res.url);
        }
      },
      enabled: !isModified,
    }
  );

  function updateServerUrl(newServerUrl: string) {
    setServerUrl(newServerUrl);
    setIsModified(true);
  }

  return { serverUrl, isModified, updateServerUrl };
}

interface FhirServerR4 {
  url: string;
}

function responseIsFhirServerR4(res: any): res is FhirServerR4 {
  return !!res.url && typeof res.url === "string";
}

export default useSourceFhirServer;
