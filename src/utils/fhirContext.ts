export interface QuestionnaireFhirContext {
  role: string;
  canonical: string;
  type: "Questionnaire";
}

export type FhirContextEntry =
  | QuestionnaireFhirContext
  | {
      role: string;
      type: string;
      canonical?: string;
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
      "http://ns.electronichealth.net.au/smart/role/new" &&
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
