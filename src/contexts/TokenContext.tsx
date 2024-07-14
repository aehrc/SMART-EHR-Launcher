import { createContext, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
}

export const TokenContext = createContext<TokenContextType>({
  token: "",
});

interface EnvVars {
  NODE_ENV: string;
  PICKER_ORIGIN: string;
  GOOGLE_ANALYTICS_ID: string;
  FHIR_SERVER_R2: string;
  FHIR_SERVER_R3: string;
  FHIR_SERVER_R4: string;
  ACCESS_TOKEN: string;
  VERSION: string;
  COMMIT: string;
}

const TokenContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  // const { data } = useQuery(["env"], () =>
  //   axios(envEndpoint).then((res) => res.data)
  // );
  //
  // if (data) {
  //   try {
  //     const env: EnvVars = JSON.parse(
  //       data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1)
  //     );
  //     token = env.ACCESS_TOKEN;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  return (
    <TokenContext.Provider value={{ token: "" }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
