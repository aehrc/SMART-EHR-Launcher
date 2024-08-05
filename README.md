# SMART-EHR-Launcher

An open-source EHR simulator dashboard testing tool to launch SMART on FHIR apps.

It is a single-page application (SPA) built in React and Typescript, and was bootstrapped with [Vite](https://vitejs.dev/).

## Live Demos
#### Smart Forms proxy server - https://dev.ehr.smartforms.io

This instance uses the proxy service from https://github.com/aehrc/smart-launcher-v2 which enables SMART App Launch functionality on top of a vanilla FHIR server.
This instance is mainly used for demonstrating the pre-population of clinical data into the [Smart Forms](https://github.com/aehrc/smart-forms) Questionnaire renderer.

See the [Using the Smart App Launch Proxy service](#using-the-smart-app-launch-proxy-service) section for details on using the proxy service.

#### Sparked AU Core reference server demo - https://sparked-au-core.d4zp11mxdi99k.amplifyapp.com

This instance is configured to work with the Sparked AU Core reference server and uses it's underlying SMART on FHIR authorisation capability provided by SMILE CDR.

Contact **Sean Fong** sean.fong@csiro.au or **Heath Frankel** <heath@intervise.com.au> to get test user credentials for login.


## Features

#### General features:
- Provides a concise Patient summary with referenced Encounters, Conditions, MedicationRequests, AllergyIntolerances, Procedures, Immunisations, Observations
- Easy switching of Patient, user (Practitioner) and Encounter launch context
- Easy switching of pre-configured SMART apps or manual config of a new SMART app (requires app registration with underlying server)
- Supports embedded SMART app view within EHR

#### Smart Forms proxy server-specific features:
- Support Questionnaire launch context in fhirContext. See https://confluence.hl7.org/display/FHIRI/fhirContext+Role+Registry

#### Sparked AU Core reference server-specific features:
- Performs OAuth2.0 authorisation with grant type `authorization_code`
- Support background refresh for OAuth2.0 `refresh_token`

## Environment Configuration
#### Mandatory environment variables:
```
VITE_FHIR_SERVER_URL=<Source FHIR API to connect to>
VITE_AUTH_REQUIRED=<Whether your server requires authorisation>
VITE_LAUNCH_PARAM_CONFIG=<default | proxy>
```
See [this section](#smart-app-launchs-launch-parameter-config) for `VITE_LAUNCH_PARAM_CONFIG` details.

#### Optional environment variables:
```
# OAuth2.0 authorisation configuration, leave empty is your server is open
VITE_OAUTH_GRANT_TYPE=<OAuth2.0 grant type>
VITE_OAUTH_SCOPE=fhirUser offline_access openid profile launch/practitioner user/*.rs (fixed scopes)
VITE_OAUTH_CLIENT_ID=<Client ID of this app registered with your server>

# Questionnaire context configuration, leave empty or use default values if not using Questionnaire context
VITE_FORMS_SERVER_URL=<Questionnaire repository server URL> (Default: https://smartforms.csiro.au/api/fhir)
VITE_FORMS_SERVER_TOKEN=<Questionnaire repository server access token>
```

It is safe to commit this .env file as it does not contain any sensitive information.

You are free to add your own environment variables to support your authorisation mechanism. If you are adding any sensitive information, please remove the `.env` file from the git repository and add it to the `.gitignore` file.
See the .env file for comments on the environment configuration.

#### Below is the configuration for the Smart Forms proxy server:
```
VITE_FHIR_SERVER_URL=https://proxy.smartforms.io/fhir
VITE_AUTH_REQUIRED=false
VITE_LAUNCH_PARAM_CONFIG=proxy
VITE_FORMS_SERVER_URL=https://smartforms.csiro.au/api/fhir
```

#### Below is the configuration for the Sparked AU Core reference server:
```
VITE_FHIR_SERVER_URL=https://fhir.hl7.org.au/aucore/fhir/DEFAULT
VITE_AUTH_REQUIRED=true
VITE_LAUNCH_PARAM_CONFIG=default
VITE_OAUTH_GRANT_TYPE=authorization_code
VITE_OAUTH_SCOPE=fhirUser offline_access openid profile launch/practitioner user/*.rs
VITE_OAUTH_CLIENT_ID=smartforms-ehr
VITE_FORMS_SERVER_URL=https://smartforms.csiro.au/api/fhir
```


## SMART App Launch's launch parameter config
Different servers might require different launch parameters to be passed to their `/authorize` endpoint. This is mainly due to the different scopes and launch context required by the server.
This app supports two types of launch parameter configurations: `default` and `proxy`. 

#### Default
This is a minimal configuration which contains the `patient`, `practitioner` and `encounter` IDs in a base64-encoded JSON object.
The Sparked AU Core reference server uses this configuration. It is recommended to use `default` in `VITE_LAUNCH_PARAM_CONFIG` if you are setting up your own server.

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
The Smart Forms proxy server uses this configuration. If you are planning to use this proxy service, you need to use set `VITE_LAUNCH_PARAM_CONFIG` as `proxy`.

Visit https://dev.ehr.smartforms.io and copy the app launch link to view an example of this configuration.


## Using the Smart App Launch Proxy service

The Smart App Launch Proxy service (https://github.com/aehrc/smart-launcher-v2) enables the SMART App Launch functionality on top of a vanilla FHIR server.
Skip this section if you are not planning to use this service.

To use the proxy service, you can use the built docker image:
```
docker run -p 8080:80 -e FHIR_SERVER_R4=<Insert FHIR server base URL> aehrc/smart-launcher-v2:latest
```
Visit `http:localhost:8080/v/r4/fhir` to see your proxied FHIR server.

It is recommended to use this [environment configuration](#below-is-the-configuration-for-the-smart-forms-proxy-server) when using the proxy service.

Note: This proxy service is only tested on open servers so far, and it is not guaranteed to work with servers that require authorisation.
