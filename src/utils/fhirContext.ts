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

import { Questionnaire } from "fhir/r4";

export const QUESTIONNAIRE_CONTEXT_ROLE =
  "http://ns.electronichealth.net.au/smart/role/new";

export const LAUNCH_AUSCVDRISKI_CONTEXT_ROLE =
  "https://smartforms.csiro.au/ig/smart/role/launch-aus-cvd-risk-i";

export interface QuestionnaireFhirContext {
  role: string;
  type: "Questionnaire";
  canonical: string;
}

export interface EndpointFhirContext {
  role: string;
  type: "Endpoint";
  reference: string;
}

export type FhirContextEntry =
  | QuestionnaireFhirContext
  | EndpointFhirContext
  | {
      role: string;
      type: string;
      canonical?: string;
      reference?: string;
      [key: string]: unknown;
    };

export type FhirContextArray = FhirContextEntry[];

// Use Australian Digital Health namespace with the "new" role for fhirContext:
// https://confluence.hl7.org/spaces/FHIRI/pages/202409650/fhirContext+Role+Registry#:~:text=N/A-,http%3A//ns.electronichealth.net.au/smart/role/new,-URL%20made%20more
export function fhirContextIsQuestionnaireContext(
  fhirContext: unknown
): fhirContext is QuestionnaireFhirContext {
  return (
    typeof fhirContext === "object" &&
    fhirContext !== null &&
    (fhirContext as QuestionnaireFhirContext)?.role ===
      QUESTIONNAIRE_CONTEXT_ROLE &&
    (fhirContext as QuestionnaireFhirContext)?.type === "Questionnaire" &&
    !!(fhirContext as QuestionnaireFhirContext)?.canonical
  );
}

// Parse fhir_context string into an array
export function parseFhirContext(
  fhirContextString: string | null | undefined
): FhirContextArray {
  if (!fhirContextString || fhirContextString.trim() === "") {
    return [];
  }

  try {
    const parsed = JSON.parse(fhirContextString);

    // If it's already an array, return it
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // If it's a single object, wrap it in an array for backward compatibility
    if (typeof parsed === "object" && parsed !== null) {
      return [parsed];
    }

    return [];
  } catch (error) {
    console.warn("Failed to parse FHIR context:", error);
    return [];
  }
}

// Serialize fhir context array to string
export function serializeFhirContext(
  fhirContextArray: FhirContextArray
): string {
  if (!fhirContextArray || fhirContextArray.length === 0) {
    return "";
  }
  return JSON.stringify(fhirContextArray);
}

// Find questionnaire context in the array
export function findQuestionnaireContext(
  fhirContextArray: FhirContextArray
): QuestionnaireFhirContext | null {
  return fhirContextArray.find(fhirContextIsQuestionnaireContext) || null;
}

// Add or update a context entry in the array
export function addOrUpdateFhirContext(
  currentFhirContextArray: FhirContextArray,
  newContext: FhirContextEntry
): FhirContextArray {
  const updated = [...currentFhirContextArray];

  // For questionnaire contexts, replace any existing questionnaire context
  if (fhirContextIsQuestionnaireContext(newContext)) {
    const existingIndex = updated.findIndex(fhirContextIsQuestionnaireContext);
    if (existingIndex >= 0) {
      updated[existingIndex] = newContext;
    } else {
      updated.push(newContext);
    }
  } else {
    // For other types, you might want different logic
    // For now, just add it
    updated.push(newContext);
  }

  return updated;
}

// Remove a context entry from the array
export function removeFhirContext(
  currentFhirContextArray: FhirContextArray,
  predicate: (context: FhirContextEntry) => boolean
): FhirContextArray {
  return currentFhirContextArray.filter((context) => !predicate(context));
}

// Check if a context is an endpoint context
export function fhirContextIsEndpointContext(
  fhirContext: unknown
): fhirContext is EndpointFhirContext {
  return (
    typeof fhirContext === "object" &&
    fhirContext !== null &&
    (fhirContext as EndpointFhirContext)?.type === "Endpoint" &&
    !!(fhirContext as EndpointFhirContext)?.reference &&
    !!(fhirContext as EndpointFhirContext)?.role
  );
}

// Check if a context is specifically for AusCVDRisk-i
export function fhirContextIsAusCVDRiskContext(
  fhirContext: unknown
): fhirContext is EndpointFhirContext {
  return (
    fhirContextIsEndpointContext(fhirContext) &&
    (fhirContext as EndpointFhirContext)?.role ===
      LAUNCH_AUSCVDRISKI_CONTEXT_ROLE
  );
}

// Find AusCVDRisk context in the array
export function findAusCVDRiskIContext(
  fhirContextArray: FhirContextArray
): EndpointFhirContext | null {
  return fhirContextArray.find(fhirContextIsAusCVDRiskContext) || null;
}

export function getGenericFhirContextNavDisplay(
  entry: FhirContextEntry
): string {
  // For other types, return reference, canonical, or N/A
  if ("reference" in entry && typeof entry.reference === "string") {
    return entry.reference;
  }

  if ("canonical" in entry && typeof entry.canonical === "string") {
    return entry.canonical;
  }

  return "N/A";
}

export function getQuestionnaireFhirContextNavDisplay(
  selectedQuestionnaire: Questionnaire
): string {
  if (selectedQuestionnaire.title) {
    return selectedQuestionnaire.title;
  }

  if (selectedQuestionnaire.name) {
    return selectedQuestionnaire.name;
  }

  if (selectedQuestionnaire.id) {
    return selectedQuestionnaire.id;
  }

  return "Untitled Questionnaire";
}
