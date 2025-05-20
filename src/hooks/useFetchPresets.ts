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

import { useQuery } from "@tanstack/react-query";
import type { Bundle, Questionnaire } from "fhir/r4";
import { useMemo } from "react";
import { fetchResourceFromEHR } from "@/api/fhirApi.ts";
import { getResources } from "@/utils/getResources.ts";
import useFormsServerAxios from "@/hooks/useFormsServerAxios.ts";
import { PresetTableData } from "@/utils/dataTable.tsx";

const presets: PresetTableData[] = [
  {
    id: "health-check-pat-sf",
    description: "Health Check - Mrs Smart Form",
    contextIds: {
      patient: "pat-sf",
      practitioner: "primary-peter",
      encounter: "health-check-pat-sf",
      questionnaire: "AboriginalTorresStraitIslanderHealthCheck",
    },
  },
  {
    id: "auscvdrisk-general-B-intermediate",
    description: "AusCVDRisk - General Intermediate Risk",
    contextIds: {
      patient: "CVDRisk-G-B-Patient",
      practitioner: "primary-peter",
    },
  },
  // {
  //   id: "auscvdrisk-general-2-low",
  //   description: "AusCVDRisk - Low Risk (General Patient 2)",
  //   contextIds: {
  //     patientId: "CVDRisk-G-2-Patient",
  //     userId: "primary-peter",
  //   },
  // },
  {
    id: "auscvdrisk-diabetes-A-intermediate",
    description: "AusCVDRisk - Diabetes-specific Intermediate Risk",
    contextIds: {
      patient: "CVDRisk-DS-A-Patient",
      practitioner: "primary-peter",
    },
  },
];

interface useFetchPresetsReturnParams {
  isInitialLoading: boolean;
}

function useFetchPresets(): useFetchPresetsReturnParams {
  const numOfSearchEntries = 200;

  const presetsTransactionBundle: Bundle = useMemo(
    () => ({
      resourceType: "Bundle",
      type: "transaction",
      entry: presets.map((preset) => {
        return {
          request: {
            method: "POST",
            url: `/${preset.id}`, // URL might depend on your specific FHIR server's endpoint setup
          },
          resource: {
            resourceType: "CustomResource", // Replace with actual FHIR resource type if specific (e.g., Patient, Encounter, Questionnaire, etc.)
            id: preset.id,
            identifier: [
              {
                system: "http://example.org/patient",
                value: preset.contextIds.patient,
              },
              {
                system: "http://example.org/user",
                value: preset.contextIds.practitioner,
              },
            ],
            description: preset.description,
            context: {
              encounter: {
                reference: `Encounter/${preset.contextIds.encounter}`,
              },
              questionnaire: {
                reference: `Questionnaire/${preset.contextIds.questionnaire}`,
              },
            },
          },
        };
      }),
    }),
    [presets]
  );

  const queryUrl = `/Questionnaire?_count=${numOfSearchEntries}&_sort=-date&`;

  const axiosInstance = useFormsServerAxios();
  const { data: bundle, isInitialLoading } = useQuery<Bundle>(
    ["questionnaires" + numOfSearchEntries.toString(), queryUrl],
    () => fetchResourceFromEHR(axiosInstance, queryUrl)
  );

  const questionnaires: Questionnaire[] = useMemo(
    () => getResources<Questionnaire>(bundle, "Questionnaire"),
    [bundle]
  );

  return {
    questionnaires,
    isInitialLoading,
  };
}

export default useFetchPresets;
