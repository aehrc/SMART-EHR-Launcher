import { createContext, ReactNode, useState } from "react";
import { IsValidIdToken, TokenResponse } from "@/utils/oauth.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { jwtDecode } from "jwt-decode";

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

  const [tokenEndpoint, setTokenEndpoint] = useState<string | null>(null);
  const [tokenResponse, setTokenResponse] = useState<TokenResponse | null>(
    null
  );
  const [fhirUser, setFhirUser] = useState<string | null>(null);

  return (
    <FhirServerContext.Provider
      value={{
        baseUrl: getFhirServerBaseUrl(),
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
