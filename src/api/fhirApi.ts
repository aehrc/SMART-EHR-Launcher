import { QUERY_HEADERS } from "../utils/misc.ts";
import { AxiosInstance } from "axios";
import { transformUrlWithVersion } from "@/utils/url.ts";

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
  axiosInstance: AxiosInstance,
  requestUrl: string
) {
  const baseUrl = axiosInstance.defaults.baseURL || "";

  const transformedUrl = transformUrlWithVersion(baseUrl, requestUrl);

  const { data } = await axiosInstance.get(transformedUrl, {
    headers: QUERY_HEADERS,
  });

  return data;
}
