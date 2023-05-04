import { createContext, ReactNode, useState } from "react";

interface TitleContextType {
  title: string;
  setTitle: (newTitle: string) => unknown;
}

export const TitleContext = createContext<TitleContextType>({
  title: "",
  setTitle: () => void 0,
});

// props types for provider
type ProviderProps = {
  children: ReactNode;
};

const TitleContextProvider = ({ children }: ProviderProps) => {
  const [title, setTitle] = useState("");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
