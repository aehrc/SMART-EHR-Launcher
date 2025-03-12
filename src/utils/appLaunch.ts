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
    app_name: "AusCVDRisk-i Calculator Demo",
    launch_url: "https://main.dlnanw1r5u3dw.amplifyapp.com/launch",
    client_id: "aus-cvd-risk-i",
    scope:
      "launch openid fhirUser online_access patient/Patient.r patient/Encounter.r patient/Condition.s patient/Observation.cs patient/Medication.r patient/MedicationRequest.s",
    redirect_uris: "https://main.dlnanw1r5u3dw.amplifyapp.com/",
    is_embedded_view: false,
  },
  // {
  //   app_name: "Beda EMR",
  //   launch_url: "https://emr.au-core.beda.software/launch",
  //   client_id: "beda-emr",
  //   scope: "",
  //   redirect_uris: "https://emr.au-core.beda.software/",
  //   is_embedded_view: false,
  // },
];
