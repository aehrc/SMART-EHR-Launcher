import { createContext, ReactNode, useState } from "react";
import { Encounter } from "fhir/r4";

export interface EncounterContextType {
  selectedEncounter: Encounter | null;
  setSelectedEncounter: (encounter: Encounter | null) => unknown;
}

export const EncounterContext = createContext<EncounterContextType>({
  selectedEncounter: null,
  setSelectedEncounter: () => void 0,
});

const EncounterContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(
    null
  );

  return (
    <EncounterContext.Provider
      value={{ selectedEncounter, setSelectedEncounter }}
    >
      {children}
    </EncounterContext.Provider>
  );
};

export default EncounterContextProvider;
