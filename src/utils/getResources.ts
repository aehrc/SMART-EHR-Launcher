import { type Bundle } from "fhir/r4";

export function getResource<T>(resource: any, resourceType: string): T | null {
  if (resource) {
    return resource.resourceType === resourceType
      ? (resource as T)
      : (resource.entry?.[0]?.resource as T) || null;
  }
  return null;
}

export function getResources<T>(
  bundle: Bundle | undefined,
  resourceType: string
): T[] {
  if (!bundle || !bundle.entry || bundle.entry.length === 0) return [];

  return bundle.entry
    .filter(
      (entry) =>
        entry.resource?.resourceType &&
        entry.resource.resourceType === resourceType
    )
    .map((entry) => entry.resource as T);
}
