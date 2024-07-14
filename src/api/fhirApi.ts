import { QUERY_HEADERS } from "../lib/utils.ts";

export async function fetchResourceFromEHR(
  requestUrl: string,
  sourceFhirServerUrl: string,
  bearerToken: string
) {
  const headers: any = {
    ...QUERY_HEADERS,
  };

  if (sourceFhirServerUrl) {
    headers["Source-Fhir-Server"] = sourceFhirServerUrl;
  }

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
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
