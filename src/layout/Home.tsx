import { useContext } from "react";
import RedirectToAuthCallback from "@/pages/OAuth/RedirectToAuthCallback.tsx";
import DashboardLayout from "@/layout/DashboardLayout.tsx";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

function Home() {
  const { token } = useContext(FhirServerContext);

  if (token === "") {
    return <RedirectToAuthCallback />;
  }

  return <DashboardLayout />;
}

export default Home;
