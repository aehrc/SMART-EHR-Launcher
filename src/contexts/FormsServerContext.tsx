import { createContext, ReactNode } from "react";
import { FORMS_SERVER_TOKEN, FORMS_SERVER_URL } from "@/globals.ts";

interface FormsServerContextType {
  baseUrl: string;
  accessToken: string;
}

export const FormsServerContext = createContext<FormsServerContextType>({
  baseUrl: "",
  accessToken: "",
});

const FormsServerContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <FormsServerContext.Provider
      value={{
        baseUrl: FORMS_SERVER_URL,
        accessToken: FORMS_SERVER_TOKEN,
      }}
    >
      {children}
    </FormsServerContext.Provider>
  );
};

export default FormsServerContextProvider;
