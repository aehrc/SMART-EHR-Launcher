import { createContext, ReactNode, useState } from "react";
import { Practitioner } from "fhir/r4";

export interface UserContextType {
  user: Practitioner | null;
  setUser: (practitioner: Practitioner | null) => unknown;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => void 0,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Practitioner | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
