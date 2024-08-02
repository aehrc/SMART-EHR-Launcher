/*
 * Copyright 2023 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="vite/client" />

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

interface ImportMetaEnv {
  // Source FHIR server
  readonly VITE_FHIR_SERVER_URL: string;

  // Determine if authorization is required
  readonly VITE_AUTH_REQUIRED: boolean;

  // OAuth configuration - only authorization_code is implemented
  // If our server doesn't support authorization_code and you want to use your oauth mechanism, you can write your own Auth component and put it in src/layout/Home.tsx
  // You are free to define your own environment variables for your oauth configuration. Remember to update vite-env.d.ts and globals.ts for Typescript types
  readonly VITE_OAUTH_GRANT_TYPE: string;
  readonly VITE_OAUTH_SCOPE: string;
  readonly VITE_OAUTH_CLIENT_ID: string;

  // Questionnaire repository configuration (optional, mainly used for launching Smart Forms)
  readonly VITE_FORMS_SERVER_URL: string;
  readonly VITE_FORMS_SERVER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
