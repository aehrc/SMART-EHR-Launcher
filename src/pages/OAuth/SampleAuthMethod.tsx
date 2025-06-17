/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
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

import { Button } from "@/components/ui/button.tsx";
import useSampleRequestTokenMethod from "@/hooks/useRequestTokenClientCredentials.ts";
import useConfig from "@/hooks/useConfig.ts";

// This is a sample implementation of a React functional component for your own OAuth2.0 methods, does not work out of the box

function SampleAuthMethod() {
  const { protocol, host } = window.location;

  const { fhirServerUrl, oAuthGrantType, oAuthScope, oAuthClientId } =
    useConfig();

  // Sample token request hook, does not work out of the box
  const { tokenStatus } = useSampleRequestTokenMethod({
    grantType: oAuthGrantType ?? "",
    scope: oAuthScope ?? "",
    aud: fhirServerUrl,
    clientId: oAuthClientId ?? "",
    // Add other parameters here as required
  });

  if (tokenStatus === "error") {
    return (
      <div className="container flex items-center h-screen mx-auto">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            Token request error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            We are unable to request an access token
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Authorisation is successful, but there is an issue performing a
            token request from the source server.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              className="text-white bg-blue-500 hover:bg-blue-600"
              size="sm"
              onClick={() => {
                window.location.href = `${protocol}//${host}`;
              }}
            >
              Retry authorisation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Every other status should show loading spinner
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <div className="border-gray-200 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      <div className="sr-only">Loading</div>
    </div>
  );
}

export default SampleAuthMethod;
