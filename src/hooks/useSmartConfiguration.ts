import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { SmartConfiguration } from "@/api/fhirApi.ts";

function useSmartConfiguration(): SmartConfiguration | null {
  const { data: smartConfiguration } = useQuery(["smart-configuration"], () =>
    axios
      .get(getFhirServerBaseUrl() + "/.well-known/smart-configuration")
      .then((res) => res.data)
  );

  if (smartConfiguration) {
    if (responseIsSmartConfiguration(smartConfiguration)) {
      return smartConfiguration;
    }
  }

  return null;
}

function responseIsSmartConfiguration(
  response: any
): response is SmartConfiguration {
  return (
    response.authorization_endpoint !== undefined &&
    response.token_endpoint !== undefined
  );
}

export default useSmartConfiguration;
