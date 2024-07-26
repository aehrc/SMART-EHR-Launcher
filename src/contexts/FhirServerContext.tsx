import { createContext, ReactNode, useState } from "react";
import { AccessTokenResponse, IsValidIdToken } from "@/utils/oauth.ts";
import { getFhirServerBaseUrl } from "@/utils/misc.ts";
import { jwtDecode } from "jwt-decode";

interface FhirServerContextType {
  baseUrl: string;
  accessTokenResponse: AccessTokenResponse | null;
  token: string;
  fhirUser: string | null;
  setAccessTokenResponse: (accessTokenResponse: AccessTokenResponse) => void;
}

export const FhirServerContext = createContext<FhirServerContextType>({
  baseUrl: "",
  accessTokenResponse: null,
  token: "",
  fhirUser: null,
  setAccessTokenResponse: () => void 0,
});

const FhirServerContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [accessTokenResponse, setAccessTokenResponse] =
    useState<AccessTokenResponse | null>(null);
  const [fhirUser, setFhirUser] = useState<string | null>(null);

  return (
    <FhirServerContext.Provider
      value={{
        baseUrl: getFhirServerBaseUrl(),
        accessTokenResponse,
        token: accessTokenResponse?.access_token ?? "",
        fhirUser,
        setAccessTokenResponse: (accessTokenResponse) => {
          setAccessTokenResponse(accessTokenResponse);

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
