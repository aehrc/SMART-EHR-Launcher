// List of SMART apps should be registered in your server, otherwise you will get an error when launching
export const preconfiguredApps = [
  {
    app_name: "Health Check Assessment",
    launch_url: "https://smartforms.csiro.au/launch",
    client_id: "a57d90e3-5f69-4b92-aa2e-2992180863c1",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "https://smartforms.csiro.au",
    is_embedded_view: false,
  },
  {
    app_name: "localhost:5173",
    launch_url: "http://localhost:5173/launch",
    client_id: "1ff7bdc2-36b2-4303-8c05-c57342c5b043",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "http://localhost:5173/",
    is_embedded_view: false,
  },
];
