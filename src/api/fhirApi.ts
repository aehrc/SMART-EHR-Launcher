import { QUERY_HEADERS } from "../utils/misc.ts";

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
