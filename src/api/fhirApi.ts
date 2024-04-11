import axios from "axios";
import { QUERY_HEADERS } from "../lib/utils.ts";

export async function fetchResourceFromEHR(endpointUrl: string) {
  const response = await axios(endpointUrl, {
    headers: {
      ...QUERY_HEADERS,
    },
  });

  return response.data;
}
