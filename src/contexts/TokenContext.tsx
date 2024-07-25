import { createContext, ReactNode, useState } from "react";
import { FORMS_SERVER_TOKEN } from "@/globals.ts";
import { AccessTokenResponse } from "@/utils/oauth.ts";

interface TokenContextType {
  fhirServerAccessToken: AccessTokenResponse | null;
  fhirServerToken: string;
  formsServerToken: string;
  setFhirServerAccessToken: (accessTokenResponse: AccessTokenResponse) => void;
}

export const TokenContext = createContext<TokenContextType>({
  fhirServerAccessToken: null,
  fhirServerToken: "",
  formsServerToken: "",
  setFhirServerAccessToken: () => void 0,
});

const TokenContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [fhirServerAccessToken, setFhirServerAccessToken] =
    useState<AccessTokenResponse | null>(null);

  return (
    <TokenContext.Provider
      value={{
        fhirServerAccessToken,
        fhirServerToken: fhirServerAccessToken?.access_token ?? "",
        formsServerToken: FORMS_SERVER_TOKEN,
        setFhirServerAccessToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
