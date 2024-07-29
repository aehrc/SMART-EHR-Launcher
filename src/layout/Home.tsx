import { useContext } from "react";
import RedirectToAuthCallback from "@/pages/OAuth/RedirectToAuthCallback.tsx";
import DashboardLayout from "@/layout/DashboardLayout.tsx";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";
import InitialPatientSelection from "@/pages/InitialPatientSelection.tsx";
import InitialUserSelection from "@/pages/InitialUserSelection.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import useLoadResources from "@/hooks/useLoadResources.ts";

function Home() {
  const { token, fhirUser } = useContext(FhirServerContext);

  useLoadResources();

  const { launch } = useLauncherQuery();
  const launchUser = launch.provider;
  const launchPatient = launch.patient;

  // Not authenticated, redirect to auth callback
  if (token === "") {
    return <RedirectToAuthCallback />;
  }

  // No user selected, redirect to user selection screen
  const fhirUserIsPractitioner =
    fhirUser && fhirUser.startsWith("Practitioner");
  if (!launchUser && !fhirUserIsPractitioner) {
    return <InitialUserSelection />;
  }

  // No patient selected, redirect to patient selection screen
  if (!launchPatient) {
    return <InitialPatientSelection />;
  }

  return <DashboardLayout />;
}

export default Home;
