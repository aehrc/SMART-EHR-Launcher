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

import { Medication, MedicationRequest, MedicationStatement } from "fhir/r4";

export type MedicationTextSource =
  | "medicationCodeableConcept"
  | "medicationReference [contained]"
  | "medicationReference [external]"
  | null;

export type MedicationLabel = {
  text: string;
  source: MedicationTextSource;
  referenceLink?: string;
};

export function getMedicationLabel(
  resource: MedicationRequest | MedicationStatement,
  referencedMedications: Medication[],
  fhirServerUrl: string
): MedicationLabel {
  let medicationText = "*";
  let source: MedicationTextSource = null;
  let referenceLink: string | undefined;

  // Get medication text from medicationCodeableConcept
  if (resource.medicationCodeableConcept) {
    medicationText =
      resource.medicationCodeableConcept?.coding?.[0].display ??
      resource.medicationCodeableConcept?.text ??
      resource.medicationCodeableConcept?.coding?.[0].code ??
      "*";
    source = "medicationCodeableConcept";
  }

  // Get medication text from contained resource
  else if (resource.medicationReference?.reference?.startsWith("#")) {
    const medicationId = resource.medicationReference.reference.slice(1);
    const containedMedication = resource.contained?.find(
      (res) => res.id === medicationId
    );

    if (containedMedication?.resourceType === "Medication") {
      medicationText =
        containedMedication?.code?.coding?.[0]?.display ||
        containedMedication?.code?.text ||
        "*";
      source = "medicationReference [contained]";
    }
  }

  // Get medication text from externally referencedMedications
  else if (resource.medicationReference?.reference) {
    const medicationRef = resource.medicationReference.reference;

    // Extract the id part after the slash, e.g. Medication/med-123 -> med-123
    const medicationId = medicationRef.split("/")[1];
    const referencedMedication = referencedMedications.find(
      (med) => med.id === medicationId
    );

    if (referencedMedication) {
      medicationText =
        referencedMedication.code?.coding?.[0]?.display ||
        referencedMedication.code?.text ||
        "*";
      source = "medicationReference [external]";

      // Add reference link for externally referenced Medication
      referenceLink = `${fhirServerUrl}/Medication/${referencedMedication.id}`;
    }
  }

  // Otherwise, fallback to use medicationReference display or "*"
  else {
    medicationText = resource.medicationReference?.display || "*";
  }

  if (
    resource.medicationCodeableConcept?.coding?.[0].system ===
    "http://terminology.hl7.org/CodeSystem/data-absent-reason"
  ) {
    medicationText = "*" + medicationText.toLowerCase();
  }

  return { text: medicationText, source: source, referenceLink: referenceLink };
}
