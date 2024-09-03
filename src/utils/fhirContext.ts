export interface QuestionnaireFhirContext {
  role: string;
  canonical: string;
  type: "Questionnaire";
}

export function fhirContextIsQuestionnaireContext(
  fhirContext: any
): fhirContext is QuestionnaireFhirContext {
  return (
    fhirContext.role &&
    fhirContext.canonical &&
    fhirContext.type === "Questionnaire"
  );
}
