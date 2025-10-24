# SMART-EHR-Launcher

An open-source EHR simulator dashboard testing tool to launch SMART on FHIR apps.

It is a single-page application (SPA) built in React and Typescript, and was bootstrapped with [Vite](https://vitejs.dev/).

## Live Demos
#### Smart Forms proxy server - https://ehr.smartforms.io

This instance uses the proxy service from https://github.com/aehrc/smart-launcher-v2 which enables SMART App Launch functionality on top of a vanilla FHIR server.
This instance is mainly used for demonstrating the pre-population of clinical data into the [Smart Forms](https://github.com/aehrc/smart-forms) Questionnaire renderer.

See the [Using the Smart App Launch Proxy service](#using-the-smart-app-launch-proxy-service) section for details on using the proxy service.

#### Sparked AU Core reference server demo - https://sparked-au-core.d4zp11mxdi99k.amplifyapp.com

This instance is configured to work with the Sparked AU Core reference server and uses it's underlying SMART on FHIR authorisation capability provided by SMILE CDR.

Contact **Heath Frankel** <heath@intervise.com.au> to get test user credentials for login.


## Features

#### General features:
- Provides concise Patient health information with referenced Encounters, Conditions, MedicationRequests, AllergyIntolerances, Procedures, Immunisations, Observations
- Easy switching of Patient, user (Practitioner) and Encounter launch context
- Easy switching of pre-configured SMART apps or manual config of a new SMART app (requires app registration with underlying server)
- Supports embedded SMART app view within EHR

#### Smart Forms proxy server-specific features:
- Support Questionnaire launch context in fhirContext. See https://confluence.hl7.org/display/FHIRI/fhirContext+Role+Registry

#### Sparked AU Core reference server-specific features:
- Performs OAuth2.0 authorisation with grant type `authorization_code`
- Support background refresh for OAuth2.0 `refresh_token`

## Configuration
This app is configured via a config.json in the /public folder. This uses a server-fetch approach to load the configuration at runtime, so you can change the config.json file without rebuilding the app.
Below is the interface of the config.json file. See [config.json](/public/config.json) for the configuration file used in https://ehr.smartforms.io.
```ts
export interface ConfigFile {
  // FHIR server for Patient record data
  fhirServerUrl: string;

  // Whether your server requires authorisation. If launchParamConfigType="proxy", this should be false.
  authRequired: boolean;

  // Launch parameter configuration type. "proxy" or "default"
  launchParamConfigType: "default" | "proxy";

  // (Optional) Need to include these config values if you are using OAuth configuration. Only authorization_code is implemented
  oAuthGrantType: "authorization_code" | null | undefined;
  oAuthScope: string | null | undefined;
  oAuthClientId: string | null | undefined;

  // FHIR server for Questionnaire definitions
  formsServerUrl: string;

  // List of applications preconfigured in "App Launch" settings
  appList: AppConfig[];
  defaultApp: AppConfig;
}
```

See [this section](#smart-app-launchs-launch-parameter-config) for `launchParamConfigType` details.

#### Mandatory configs:
```
fhirServerUrl: <FHIR server for Patient record data>
authRequired: <Whether your server requires authorisation>
launchParamConfigType: <"default" | "proxy">
formsServerUrl: <Questionnaire repository server URL> (Use https://smartforms.csiro.au/api/fhir if you don't have one)
appList: <List of applications preconfigured in "App Launch" settings>
defaultApp: <Default application to launch>
```
See [this section](#smart-app-launchs-launch-parameter-config) for `launchParamConfigType` details.

#### Optional configs:
```
# OAuth2.0 authorisation configuration, leave empty is your server is open
oAuthGrantType: <OAuth2.0 grant type>
oAuthScope: fhirUser offline_access openid profile launch/practitioner user/*.rs (fixed scopes)
oAuthClientId: <Client ID of this app registered with your server>
```

You are free to add your own environment variables to support your authorisation mechanism. If you are adding any sensitive information, please remove `config.json` from the git repository and add it to the `.gitignore` file.

#### Below is the configuration for the Smart Forms proxy server:
```json
{
  "fhirServerUrl": "https://proxy.smartforms.io/v/r4/fhir",
  "authRequired": false,
  "launchParamConfigType": "proxy",
  "formsServerUrl": "https://smartforms.csiro.au/api/fhir",
  "appList": ["<snipped for brevity>"],
  "defaultApp": "<snipped for brevity>"
}
```

#### Below is the configuration for the Sparked AU Core reference server:
```json
{
  "fhirServerUrl": "https://fhir.hl7.org.au/aucore/fhir/DEFAULT",
  "authRequired": true,
  "launchParamConfigType": "default",
  "oAuthGrantType": "authorization_code",
  "oAuthScope": "fhirUser offline_access openid profile launch/practitioner user/*.rs",
  "oAuthClientId": "smartforms-ehr",
  "formsServerUrl": "https://smartforms.csiro.au/api/fhir",
  "appList": ["<snipped for brevity>"],
  "defaultApp": "<snipped for brevity>"
}
```


## SMART App Launch's launch parameter config
Different servers might require different launch parameters to be passed to their `/authorize` endpoint. This is mainly due to the different scopes and launch context required by the server.
This app supports two types of launch parameter configurations: `default` and `proxy`. 

#### Default
This is a minimal configuration which contains the `patient`, `practitioner` and `encounter` IDs in a base64-encoded JSON object.
The Sparked AU Core reference server uses this configuration. It is recommended to use `default` in `launchParamConfigType` if you are setting up your own server.

Example:
Decoded JSON
```
{
  "patient": "howe-deangelo",
  "practitioner": "samuels-wyatt",
  "encounter": "nailwound"
}
```

Base64-encoded
```eyJwYXRpZW50IjoiaG93ZS1kZWFuZ2VsbyIsInByYWN0aXRpb25lciI6InNhbXVlbHMtd3lhdHQiLCJlbmNvdW50ZXIiOiJuYWlsd291bmQifQ```

Launch URL
```https://smartforms.csiro.au/launch?iss=https%3A%2F%2Ffhir.hl7.org.au%2Faucore%2Ffhir%2FDEFAULT&launch=eyJwYXRpZW50IjoiaG93ZS1kZWFuZ2VsbyIsInByYWN0aXRpb25lciI6InNhbXVlbHMtd3lhdHQiLCJlbmNvdW50ZXIiOiJuYWlsd291bmQifQ```

#### Proxy
The Smart App Launch Proxy service define its own fairly comprehensive launch parameter configuration as a base64-encoded JSON array.
The Smart Forms proxy server uses this configuration. If you are planning to use this proxy service, you need to use set `launchParamConfigType` as `proxy`.

Visit https://ehr.smartforms.io and copy the app launch link to view an example of this configuration.


## Using the Smart App Launch Proxy service

The Smart App Launch Proxy service (https://github.com/aehrc/smart-launcher-v2) enables the SMART App Launch functionality on top of a vanilla FHIR server.
Skip this section if you are not planning to use this service.

To use the proxy service, you can use the built docker image:
```
docker run -p 8080:80 -e FHIR_SERVER_R4=<Insert FHIR server base URL> aehrc/smart-launcher-v2:latest
```
Visit `http:localhost:8080/v/r4/fhir` to see your proxied FHIR server.

It is recommended to use this [configuration](#below-is-the-configuration-for-the-smart-forms-proxy-server) when using the proxy service.
Remember to set `fhirServerUrl` to the proxy server's base URL, e.g. `http:localhost:8080/v/r4/fhir`, not `http:localhost:8080/fhir`.

Note: This proxy service is only tested on open servers so far, and it is not guaranteed to work with servers that require authorisation.
