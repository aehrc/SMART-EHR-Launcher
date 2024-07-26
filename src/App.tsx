import { TooltipProvider } from "@/components/ui/tooltip";
import ActivePageContextProvider from "@/contexts/ActivePageContext.tsx";
import { SnackbarProvider } from "notistack";
import FormsServerContextProvider from "@/contexts/FormsServerContext.tsx";
import QuestionnaireContextProvider from "@/contexts/QuestionnaireContext.tsx";
import PatientContextProvider from "@/contexts/PatientContext.tsx";
import UserContextProvider from "@/contexts/UserContext.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Settings from "@/pages/Settings/Settings.tsx";
import EncounterContextProvider from "@/contexts/EncounterContext.tsx";
import { settingsMenuItems } from "@/utils/settingsMenuItem.tsx";
import PatientSummary from "@/pages/PatientSummary/PatientSummary.tsx";
import EmbeddedApp from "@/pages/EmbeddedApp/EmbeddedApp.tsx";
import AuthCallback from "@/pages/AuthCallback/AuthCallback.tsx";
import Home from "@/layout/Home.tsx";
import FhirServerContextProvider from "@/contexts/FhirServerContext.tsx";
import CloseSnackbar from "@/components/CloseSnackbar.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "authcallback",
      element: <AuthCallback />,
    },
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "",
          element: <PatientSummary />,
        },
        {
          path: "embedded-app",
          element: <EmbeddedApp />,
        },
        {
          path: "settings",
          element: <Settings />,
          children: settingsMenuItems.map((item) => ({
            path: item.path.replace("/settings", "").slice(1) || "", // Transform the path
            element: item.element,
          })),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <TooltipProvider delayDuration={100}>
      <SnackbarProvider maxSnack={1} action={CloseSnackbar}>
        <FhirServerContextProvider>
          <FormsServerContextProvider>
            <ActivePageContextProvider>
              <PatientContextProvider>
                <UserContextProvider>
                  <EncounterContextProvider>
                    <QuestionnaireContextProvider>
                      <RouterProvider router={router} />
                    </QuestionnaireContextProvider>
                  </EncounterContextProvider>
                </UserContextProvider>
              </PatientContextProvider>
            </ActivePageContextProvider>
          </FormsServerContextProvider>
        </FhirServerContextProvider>
      </SnackbarProvider>
    </TooltipProvider>
  );
}

export default App;
