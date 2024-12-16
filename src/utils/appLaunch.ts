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
    app_name: "Pediatric Growth Chart",
    launch_url:
      "http://examples.smarthealthit.org/growth-chart-app/launch.html",
    client_id: "growth_chart",
    scope:
      "openid profile launch patient/Observation.read patient/Patient.read offline_access",
    redirect_uris: "http://examples.smarthealthit.org/growth-chart-app",
    is_embedded_view: false,
  },
  {
    app_name: "SMART Australian Tester",
    launch_url:
      "https://smartqedit4.azurewebsites.net/ts/Tester/smart-launch.html",
    client_id: "16cbfe7c-6c56-4876-944f-534f9306bf8b",
    scope:
      "openid profile patient/Patient.read patient/Flag.read user/Practitioner.read user/PractitionerRole.read user/Organization.read launch",
    redirect_uris:
      "https://smartqedit4.azurewebsites.net/ts/Tester/smart-index.html",
    is_embedded_view: true,
  },
  {
    app_name: "dev.smartforms.io",
    launch_url: "https://dev.smartforms.io/launch",
    client_id: "a57d90e3-5f69-4b92-aa2e-2992180863c1",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "https://dev.smartforms.io/",
    is_embedded_view: false,
  },
  {
    app_name: "acdcpilot.smartforms.io",
    launch_url: "https://acdcpilot.smartforms.io/launch",
    client_id: "31b7f0fa-369f-49b4-4ad7-08dc6e2e0cf1",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "https://acdcpilot.smartforms.io/",
    is_embedded_view: false,
  },
  {
    app_name: "healthchecks.smartforms.io",
    launch_url: "https://healthchecks.smartforms.io/launch",
    client_id: "29b79fe3-720e-48a8-976f-eca25b19f187",
    scope:
      "fhirUser online_access openid profile patient/Condition.rs patient/Observation.rs launch patient/Encounter.rs patient/QuestionnaireResponse.cruds patient/Patient.rs",
    redirect_uris: "https://healthchecks.smartforms.io/",
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
  {
    app_name: "AusCVDRisk Calculator Demo",
    launch_url: "https://main.dlnanw1r5u3dw.amplifyapp.com/launch",
    client_id: "aus-cvd-risk-i",
    scope:
      "launch openid fhirUser online_access patient/Patient.r patient/Encounter.r patient/Condition.s patient/Observation.cs",
    redirect_uris: "https://main.dlnanw1r5u3dw.amplifyapp.com/",
    is_embedded_view: false,
  },
  {
    app_name: "SMART on FHIR Problem List Demo",
    launch_url: "https://main.d2gc21b6xr8ukx.amplifyapp.com/launch",
    client_id: "a5403f19-3b1c-4f19-b298-cc42e8c3a9c0",
    scope:
      "fhirUser online_access openid profile launch patient/Patient.rs patient/Encounter.cruds patient/Condition.cruds",
    redirect_uris: "https://main.d2gc21b6xr8ukx.amplifyapp.com/",
    is_embedded_view: false,
  },
  {
    app_name: "Beda EMR",
    launch_url: "https://emr.au-core.beda.software/launch",
    client_id: "beda-emr",
    scope: "",
    redirect_uris: "https://emr.au-core.beda.software/",
    is_embedded_view: false,
  },
];
