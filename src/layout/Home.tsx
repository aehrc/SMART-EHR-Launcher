import { useContext } from "react";
import RedirectToAuthCallback from "@/pages/OAuth/RedirectToAuthCallback.tsx";
import { TokenContext } from "@/contexts/TokenContext.tsx";
import DashboardLayout from "@/layout/DashboardLayout.tsx";

function Home() {
  const { fhirServerToken } = useContext(TokenContext);

  if (fhirServerToken === "") {
    return <RedirectToAuthCallback />;
  }

  return <DashboardLayout />;
}

export default Home;
