import { createContext, ReactNode, useState } from "react";
import { Practitioner } from "fhir/r4";

export interface UserContextType {
  selectedUser: Practitioner | null;
  setSelectedUser: (practitioner: Practitioner | null) => unknown;
}

export const UserContext = createContext<UserContextType>({
  selectedUser: null,
  setSelectedUser: () => void 0,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Practitioner | null>(null);

  return (
    <UserContext.Provider
      value={{ selectedUser: user, setSelectedUser: setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
