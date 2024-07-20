import { useMemo } from "react";
import { Patient } from "fhir/r4";
import { formatAge, humanName } from "@/utils/misc.ts";
import dayjs from "dayjs";

function usePatientDetails(patient: Patient | null) {
  const { patientName, patientGender, patientAge, patientDob } = useMemo(() => {
    if (!patient) {
      return {
        patientName: "",
        patientGender: "",
        patientAge: "",
        patientDob: "",
      };
    }

    return {
      patientName: humanName(patient),
      patientGender: patient.gender
        ? patient.gender[0].toUpperCase() + patient.gender.slice(1)
        : "Not specified",
      patientAge: formatAge(patient),
      patientDob: dayjs(patient.birthDate).format("DD/MM/YYYY"),
    };
  }, [patient]);

  return { patientName, patientGender, patientAge, patientDob };
}

export default usePatientDetails;
