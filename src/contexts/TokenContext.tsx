import { createContext, ReactNode } from "react";
import { FHIR_SERVER_TOKEN, FORMS_SERVER_TOKEN } from "@/globals.ts";

interface TokenContextType {
  fhirServerToken: string;
  formsServerToken: string;
}

export const TokenContext = createContext<TokenContextType>({
  fhirServerToken: "",
  formsServerToken: "",
});

const TokenContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <TokenContext.Provider
      value={{
        fhirServerToken: FHIR_SERVER_TOKEN,
        formsServerToken: FORMS_SERVER_TOKEN,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
