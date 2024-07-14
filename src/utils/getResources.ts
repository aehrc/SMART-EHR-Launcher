import { Patient, Practitioner } from "fhir/r4";

export function getPatient(resource: any): Patient | null {
  let patient: Patient | null = null;
  if (resource) {
    patient =
      resource.resourceType === "Patient"
        ? resource
        : (resource.entry?.[0]?.resource as Patient);
  }
  return patient;
}

export function getPractitioner(resource: any): Practitioner | null {
  let newPractitioner: Practitioner | null = null;
  if (resource) {
    newPractitioner =
      resource.resourceType === "Practitioner"
        ? resource
        : (resource.entry?.[0]?.resource as Practitioner);
  }

  return newPractitioner;
}
