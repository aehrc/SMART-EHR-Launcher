import { QUERY_HEADERS } from "../utils/misc.ts";

export interface SmartConfiguration {
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string;
  token_endpoint: string;
  token_endpoint_auth_methods_supported: string[];
  introspection_endpoint: string;
  code_challenge_methods_supported: string[];
  scopes_supported: string[];
  response_types_supported: string[];
  capabilities: string[];
}

export async function fetchResourceFromEHR(
  requestUrl: string,
  _sourceFhirServerUrl: string,
  bearerToken: string
) {
  const headers: any = {
    ...QUERY_HEADERS,
  };

  if (bearerToken) {
    headers["Authorization"] = `${bearerToken}`;
  }

  const response = await fetch(requestUrl, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error when performing ${requestUrl}. Status: ${response.status}`
    );
  }

  return response.json();
}
