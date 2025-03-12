import { AxiosInstance } from "axios";
import { QUERY_HEADERS } from "@/utils/misc.ts";

export async function fetchAidboxLaunchUri(
  axiosInstance: AxiosInstance,
  sub: string,
  clientId: string,
  context: object
) {
  const baseUrl = axiosInstance.defaults.baseURL || "";

  const rpcMethod = "aidbox.smart/get-launch-uri";

  // Get the root URL e.g. https://smartonfhir.aidbox.beda.software without /fhir
  let rootUrl: string;
  try {
    const url = new URL(baseUrl);
    rootUrl = `${url.protocol}//${url.hostname}`;
  } catch {
    rootUrl = baseUrl;
  }
  const rpcUrl = `${rootUrl}/rpc`;

  // Create the body for the RPC fetch launch URI request
  const requestBody = {
    method: rpcMethod,
    params: {
      user: sub,
      iss: baseUrl,
      client: clientId,
      ctx: context,
    },
  };

  const { data } = await axiosInstance.post(rpcUrl, requestBody, {
    headers: QUERY_HEADERS,
  });

  return data;
}

interface LaunchUriResponse {
  result: LaunchUriResult;
}

interface LaunchUriResult {
  iss: string;
  launch: string;
  launch_uri: string;
  uri: string;
}

export function isFetchLaunchUriResponse(res: any): res is LaunchUriResponse {
  return (
    res &&
    res.result &&
    res.result.iss &&
    res.result.launch &&
    res.result["launch-uri"] &&
    res.result.uri
  );
}
