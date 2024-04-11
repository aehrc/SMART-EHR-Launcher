import { createContext, ReactNode } from "react";

interface TokenContextType {
  token: string | null;
}

export const TokenContext = createContext<TokenContextType>({
  token: "",
});

const TokenContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  let token: string | null = null;

  const data = {
    ACCESS_TOKEN: "",
  };

  if (data) {
    try {
      token = data.ACCESS_TOKEN;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export default TokenContextProvider;
