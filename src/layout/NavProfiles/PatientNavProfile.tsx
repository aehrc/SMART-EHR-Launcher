import { getFhirServerBaseUrl, humanName } from "../../utils/misc.ts";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../contexts/PatientContext.tsx";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { TokenContext } from "../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { Bundle, Patient } from "fhir/r4";
import { fetchResourceFromEHR } from "../../api/fhirApi.ts";
import { getPatient } from "../../utils/getResources.ts";
import useSourceFhirServer from "../../hooks/useSourceFhirServer.ts";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

function PatientNavProfile() {
  const { query, launch, setQuery } = useLauncherQuery();
  const { serverUrl } = useSourceFhirServer();

  const { token } = useContext(TokenContext);
  const { patient, setPatient } = useContext(PatientContext);

  const patientId = launch.patient;
  const encounterId = launch.encounter;

  const queryEndpoint =
    getFhirServerBaseUrl() + (patientId ? `/Patient/${patientId}` : "/Patient");

  const {
    data: resource,
    error,
    isLoading,
  } = useQuery<Patient | Bundle>(
    ["patientProfile", serverUrl, patientId],
    () => fetchResourceFromEHR(queryEndpoint, serverUrl, token ?? ""),
    { enabled: token !== null }
  );

  const newPatient = getPatient(resource);

  let encounterSelected = "";
  if (encounterId && encounterId !== "AUTO") {
    encounterSelected = encounterId;
  } else {
    encounterSelected = "No encounter selected";
  }

  useEffect(() => {
    if (!newPatient) {
      return;
    }

    setPatient(newPatient);
    setQuery({ ...query, patient: newPatient.id });
  }, [newPatient]);

  return (
    <div className="flex items-center gap-3 h-16 px-4 bg-muted rounded">
      <div className="flex flex-col items-center text-blue-800">
        <User className="h-5 w-5" />
        <div className="text-xs font-medium px-2.5 py-0.5 mt-1 rounded bg-blue-100">
          Patient
        </div>
      </div>

      <div className="border-l border-gray-300 dark:border-gray-600 h-10" />

      <div className="text-gray-600">
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 animate-pulse" />
            <Skeleton className="h-2 w-32 bg-gray-200 animate-pulse" />
            <Skeleton className="h-2 w-32 bg-gray-200 animate-pulse" />
          </div>
        ) : error || !patient ? (
          <div className="text-sm font-medium text-red-500">
            Patient not selected
          </div>
        ) : (
          <>
            <div className="text-sm font-medium">{humanName(patient)}</div>
            <div className="text-xs font-light text-gray-600">{patient.id}</div>
            <div className="text-xs text-gray-500 mt-1.5">
              {encounterSelected}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientNavProfile;
