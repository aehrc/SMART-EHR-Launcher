import axios from "axios";
import { QUERY_HEADERS } from "../lib/utils.ts";

export async function fetchResourceFromEHR(
  endpointUrl: string,
  bearerToken: string
) {
  const response = await axios(endpointUrl, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...QUERY_HEADERS,
    },
  });

  return response.data;
}
