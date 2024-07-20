import { useContext } from "react";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import PatientCard from "@/pages/PatientSummary/PatientCard.tsx";
import PatientDetails from "@/pages/PatientSummary/PatientDetails.tsx";

function PatientSummary() {
  const { selectedPatient } = useContext(PatientContext);

  // FIXME embedded view

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-4">
        <div className="grid gap-6">
          <PatientCard patient={selectedPatient} />
          <PatientDetails patient={selectedPatient} />
        </div>
      </div>
    </main>
  );
}

export default PatientSummary;
