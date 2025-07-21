export interface QuestionnaireFhirContext {
  role: string;
  canonical: string;
  type: "Questionnaire";
}

// Use Australian Digital Health namespace with the "new" role for fhirContext:
// https://confluence.hl7.org/spaces/FHIRI/pages/202409650/fhirContext+Role+Registry#:~:text=N/A-,http%3A//ns.electronichealth.net.au/smart/role/new,-URL%20made%20more
export function fhirContextIsQuestionnaireContext(
  fhirContext: any
): fhirContext is QuestionnaireFhirContext {
  return (
    fhirContext?.role === "http://ns.electronichealth.net.au/smart/role/new" &&
    fhirContext?.type === "Questionnaire" &&
    !!fhirContext?.canonical
  );
}
