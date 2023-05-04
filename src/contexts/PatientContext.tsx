import { createContext, ReactNode, useState } from "react";
import { Patient } from "fhir/r4";

export interface PatientContextType {
  patient: Patient | null;
  setPatient: (patient: Patient | null) => unknown;
}

export const PatientContext = createContext<PatientContextType>({
  patient: null,
  setPatient: () => void 0,
});

const PatientContextProvider = ({ children }: { children: ReactNode }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
