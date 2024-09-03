import { createContext, ReactNode, useState } from "react";
import { Patient } from "fhir/r4";

export interface PatientContextType {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => unknown;
}

export const PatientContext = createContext<PatientContextType>({
  selectedPatient: null,
  setSelectedPatient: () => void 0,
});

const PatientContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
