import { createContext, ReactNode, useState } from "react";
import { PractitionerRole } from "fhir/r4";
import useSupportPractitionerRoleContext from "@/hooks/useSupportPractitionerRoleContext";

interface PractitionerRoleContextType {
  selectedPractitionerRole: PractitionerRole | null;
  practitionerRoleContextEnabled: boolean;
  setSelectedPractitionerRole: (selected: PractitionerRole | null) => unknown;
  onEnablePractitionerRoleContext: () => unknown;
}

export const PractitionerRoleContext =
  createContext<PractitionerRoleContextType>({
    selectedPractitionerRole: null,
    practitionerRoleContextEnabled: false,
    setSelectedPractitionerRole: () => void 0,
    onEnablePractitionerRoleContext: () => void 0,
  });

const PractitionerRoleContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const isSupported = useSupportPractitionerRoleContext();

  const [practitionerRoleContextEnabled, setPractitionerRoleContextEnabled] =
    useState(isSupported);
  const [selectedPractitionerRole, setSelectedPractitionerRole] =
    useState<PractitionerRole | null>(null);

  if (isSupported && isSupported !== practitionerRoleContextEnabled) {
    setPractitionerRoleContextEnabled(isSupported);
  }

  return (
    <PractitionerRoleContext.Provider
      value={{
        selectedPractitionerRole,
        practitionerRoleContextEnabled,
        setSelectedPractitionerRole,
        onEnablePractitionerRoleContext: () => {
          setPractitionerRoleContextEnabled(true);
        },
      }}
    >
      {children}
    </PractitionerRoleContext.Provider>
  );
};

export default PractitionerRoleContextProvider;
