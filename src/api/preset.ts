/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PresetTableData } from "@/utils/dataTable.tsx";
import { AxiosInstance } from "axios";
import { QUERY_HEADERS } from "@/utils/misc.ts";
import { Bundle } from "fhir/r4";

export function createPresetTransactionBundle(preset: PresetTableData) {
  return {
    resourceType: "Bundle",
    type: "transaction",
    entry: Object.entries(preset.contextIds).map(([key, value]) => ({
      request: {
        method: "GET",
        url: `${key}/${value}`, // E.g., "patientId/123"
      },
    })),
  };
}

const fetchTransactionBundle = async (bundle) => {
  const response = await fetch("https://fhir-server-url/Bundle", {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
    },
    body: JSON.stringify(bundle),
  });

  const result = await response.json();

  // Check if all resources were retrieved successfully
  const allResourcesExist = result.entry.every((entry) =>
    entry.response.status.startsWith("200")
  );

  return allResourcesExist ? result : null; // Return result only if all resources are available
};

export async function postTransactionToEHR(
  axiosInstance: AxiosInstance,
  bundle: Bundle
) {
  const { data } = await axiosInstance.post(requestUrl, {
    headers: QUERY_HEADERS,
  });

  return data;
}
