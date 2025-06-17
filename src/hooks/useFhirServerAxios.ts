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

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import { responseIsTokenResponse, TokenResponse } from "@/utils/oauth.ts";
import useConfig from "@/hooks/useConfig.ts";

async function refreshAccessToken(
  tokenEndpoint: string,
  refreshToken: string,
  clientId: string
): Promise<TokenResponse | null> {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error when performing ${tokenEndpoint}. Status: ${response.status}`
    );
  }

  const resBody = await response.json();
  if (responseIsTokenResponse(resBody)) {
    return resBody;
  }

  return null;
}

function useAxios() {
  const { oAuthClientId } = useConfig();
  const {
    baseUrl,
    tokenEndpoint,
    accessToken,
    refreshToken,
    setTokenResponse,
  } = useContext(FhirServerContext);

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);

        // Convert decodedToken.exp to milliseconds
        if (decodedToken.exp) {
          const expiresInMinus10Minutes = decodedToken.exp * 1000 - 600000;
          if (expiresInMinus10Minutes < Date.now()) {
            try {
              const newTokenResponse = await refreshAccessToken(
                tokenEndpoint,
                refreshToken,
                oAuthClientId ?? ""
              );

              if (newTokenResponse) {
                setTokenResponse(newTokenResponse);
                config.headers.Authorization = `Bearer ${newTokenResponse.access_token}`;
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
            }
          }
        }

        // Reuse existing token
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Reuse existing config if not token (should not happen)
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
}

export default useAxios;
