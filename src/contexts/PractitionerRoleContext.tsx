import { createContext, ReactNode, useState } from "react";
import { PractitionerRole } from "fhir/r4";

interface PractitionerRoleContextType {
  selectedPractitionerRole: PractitionerRole | null;
  setSelectedPractitionerRole: (selected: PractitionerRole | null) => unknown;
}

export const PractitionerRoleContext =
  createContext<PractitionerRoleContextType>({
    selectedPractitionerRole: null,
    setSelectedPractitionerRole: () => void 0,
  });

const PractitionerRoleContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [selectedPractitionerRole, setSelectedPractitionerRole] =
    useState<PractitionerRole | null>(null);

  return (
    <PractitionerRoleContext.Provider
      value={{
        selectedPractitionerRole,
        setSelectedPractitionerRole,
      }}
    >
      {children}
    </PractitionerRoleContext.Provider>
  );
};

export default PractitionerRoleContextProvider;
