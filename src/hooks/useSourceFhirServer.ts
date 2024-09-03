import { useContext } from "react";
import { SourceFhirServerContext } from "../contexts/SourceFhirServerContext.tsx";

export function useSourceFhirServer() {
  const { serverUrl, isModified, setServerUrl, setIsModified } = useContext(
    SourceFhirServerContext
  );

  function updateServerUrl(newServerUrl: string) {
    setServerUrl(newServerUrl);
    setIsModified(true);
  }

  return { serverUrl, isModified, updateServerUrl };
}

export default useSourceFhirServer;
