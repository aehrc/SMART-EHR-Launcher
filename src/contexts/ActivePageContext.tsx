import { createContext, ReactNode, useState } from "react";

interface ActivePageContextType {
  path: string;
  setPath: (newPath: string) => unknown;
}

export const ActivePageContext = createContext<ActivePageContextType>({
  path: "",
  setPath: () => void 0,
});

const ActivePageContextProvider = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <ActivePageContext.Provider value={{ path, setPath }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export default ActivePageContextProvider;
