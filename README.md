<h1>SMART-EHR-Launcher</h1>

<h3>An open-source simulated EHR dashboard testing tool for FHIR servers to launch SMART on FHIR apps<h3/>

<h4><a href="https://sparked-au-core.d4zp11mxdi99k.amplifyapp.com">Show me the app ➡️</a></h4>

Note: Contact **Sean Fong** sean.fong@csiro.au or **Heath Frankel** <heath@intervise.com.au> to get test user credentials for login.

---

### Features (For Sparked AU Core testing purposes)
- Performs OAuth2.0 authorisation with server for EHR simulator acccess
- Provides a concise Patient summary with referenced Encounters, Conditions, MedicationRequests, AllergyIntelorances, Procedures, Immunisations, Observations
- Easy switching of Patient, user (Practitioner) and Encounter launch context
- Easy switching of pre-configured SMART apps or manual config of a new SMART app (requires app registration)\
- Supports embedded SMART app view within EHR
- Automatic refreshing of access tokens in the background

### Environment Configuration
If you are using this testing tool against your own server:
```
VITE_FHIR_SERVER_URL=<Source FHIR API to connect to>
VITE_LAUNCH_SCOPE=fhirUser offline_access openid profile launch/practitioner user/*.rs (fixed scopes)
VITE_LAUNCH_CLIENT_ID=<Client ID for this EHR simulator app>
```

Below is the configuration for the Sparked AU Core reference server:
```
VITE_FHIR_SERVER_URL=https://fhir.hl7.org.au/aucore/fhir/DEFAULT
VITE_LAUNCH_SCOPE=fhirUser offline_access openid profile launch/practitioner user/*.rs
VITE_LAUNCH_CLIENT_ID=smartforms-ehr
```

