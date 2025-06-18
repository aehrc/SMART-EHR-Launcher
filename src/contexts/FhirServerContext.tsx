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

import { createContext, ReactNode, useState } from "react";
import { IsValidIdToken, TokenResponse } from "@/utils/oauth.ts";
import { jwtDecode } from "jwt-decode";
import useConfig from "@/hooks/useConfig.ts";

interface FhirServerContextType {
  baseUrl: string;
  tokenEndpoint: string;
  tokenResponse: TokenResponse | null;
  accessToken: string;
  refreshToken: string;
  fhirUser: string | null;
  setTokenEndpoint: (token_endpoint: string) => void;
  setTokenResponse: (accessTokenResponse: TokenResponse) => void;
}

export const FhirServerContext = createContext<FhirServerContextType>({
  baseUrl: "",
  tokenEndpoint: "",
  tokenResponse: null,
  accessToken: "",
  refreshToken: "",
  fhirUser: null,
  setTokenEndpoint: () => void 0,
  setTokenResponse: () => void 0,
});

const FhirServerContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const { fhirServerUrl } = useConfig();

  const [tokenEndpoint, setTokenEndpoint] = useState<string | null>(null);
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(
    null
  );
  const [fhirUser, setFhirUser] = useState<string | null>(null);

  return (
    <FhirServerContext.Provider
      value={{
        baseUrl: fhirServerUrl,
        tokenEndpoint: tokenEndpoint ?? "",
        tokenResponse: tokenResponse,
        accessToken: tokenResponse?.access_token ?? "",
        refreshToken: tokenResponse?.refresh_token ?? "",
        fhirUser,
        setTokenEndpoint: (token_endpoint) => setTokenEndpoint(token_endpoint),
        setTokenResponse: (accessTokenResponse) => {
          setTokenResponse(accessTokenResponse);

          const decodedIdToken = jwtDecode(accessTokenResponse.id_token);
          if (IsValidIdToken(decodedIdToken)) {
            setFhirUser(getResourceIdentifier(decodedIdToken.fhirUser));
          }
        },
      }}
    >
      {children}
    </FhirServerContext.Provider>
  );
};

function getResourceIdentifier(url: string) {
  const parts = url.split("/");
  if (parts.length >= 2) {
    const lastTwoParts = parts.slice(-2); // Get the last two segments
    return lastTwoParts.join("/"); // Join them back together
  }

  return null; // Return null or handle the case where the URL is not as expected
}

export default FhirServerContextProvider;
