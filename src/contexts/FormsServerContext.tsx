import { createContext, ReactNode } from "react";
import { FORMS_SERVER_TOKEN, FORMS_SERVER_URL } from "@/globals.ts";

interface FormsServerContextType {
  baseUrl: string;
  token: string;
}

export const FormsServerContext = createContext<FormsServerContextType>({
  baseUrl: "",
  token: "",
});

const FormsServerContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  return (
    <FormsServerContext.Provider
      value={{
        baseUrl: FORMS_SERVER_URL,
        token: FORMS_SERVER_TOKEN,
      }}
    >
      {children}
    </FormsServerContext.Provider>
  );
};

export default FormsServerContextProvider;
