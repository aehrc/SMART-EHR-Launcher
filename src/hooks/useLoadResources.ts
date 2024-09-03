import useLauncherQuery from "./useLauncherQuery.ts";
import { useEffect } from "react";
import useSourceFhirServer from "./useSourceFhirServer.ts";

function useLoadResources() {
  const { query, launch, setQuery } = useLauncherQuery();
  const { serverUrl } = useSourceFhirServer();

  useEffect(() => {
    setQuery({
      ...query,
      launch_url: query.launch_url || "https://smartforms.csiro.au/launch",
      app_name: query.app_name || "Health Check Assessment",
      client_id: launch.client_id || "a57d90e3-5f69-4b92-aa2e-2992180863c1",
      scope:
        launch.scope ||
        "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
      redirect_uris: launch.redirect_uris || "https://smartforms.csiro.au",
      validation: "1",
      fhir_context: launch.fhir_context || "",
      source_fhir_server: launch.source_fhir_server || serverUrl,
      is_embedded_view: launch.is_embedded_view || false,
    });
  }, []);
}

export default useLoadResources;
