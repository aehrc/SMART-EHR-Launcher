import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SmartConfiguration {
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string[];
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  introspection_endpoint: string;
  code_challenge_methods_supported: string[];
  scopes_supported: string[];
  response_types_supported: string[];
  capabilities: string[];
}

export function useSupportQuestionnaireContext() {
  const smartConfigurationEndpoint =
    getFhirServerBaseUrl() + "/.well-known/smart-configuration";

  const { data } = useQuery(["smart-configuration"], () =>
    axios(smartConfigurationEndpoint).then((res) => res.data)
  );

  let scopes: string[] = [];
  if (data) {
    try {
      const smartConfiguration = data as SmartConfiguration;
      scopes = smartConfiguration.scopes_supported;
    } catch (e) {
      console.error(e);
    }
  }

  return scopes.includes("launch/questionnaire");
}

export default useSupportQuestionnaireContext;
