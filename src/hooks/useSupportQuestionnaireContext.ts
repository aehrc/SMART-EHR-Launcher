import useSmartConfiguration from "@/hooks/useSmartConfiguration.ts";

export function useSupportQuestionnaireContext() {
  const smartConfiguration = useSmartConfiguration();

  let scopes: string[] = [];
  if (smartConfiguration) {
    try {
      scopes = smartConfiguration.scopes_supported;
    } catch (e) {
      console.error(e);
    }
  }

  return scopes.includes("launch/questionnaire");
}

export default useSupportQuestionnaireContext;
