import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import { OAUTH_CLIENT_ID } from "@/globals.ts";
import { responseIsTokenResponse, TokenResponse } from "@/utils/oauth.ts";

async function refreshAccessToken(
  tokenEndpoint: string,
  refreshToken: string
): Promise<TokenResponse | null> {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: OAUTH_CLIENT_ID,
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
                refreshToken
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
