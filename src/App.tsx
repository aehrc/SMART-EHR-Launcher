import { TooltipProvider } from "@/components/ui/tooltip";
import ActivePageContextProvider from "@/contexts/ActivePageContext.tsx";
import { SnackbarProvider } from "notistack";
import TokenContextProvider from "@/contexts/TokenContext.tsx";
import QuestionnaireContextProvider from "@/contexts/QuestionnaireContext.tsx";
import PatientContextProvider from "@/contexts/PatientContext.tsx";
import UserContextProvider from "@/contexts/UserContext.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout.tsx";
import Settings from "@/pages/Settings/Settings.tsx";
import EncounterContextProvider from "@/contexts/EncounterContext.tsx";
import { settingsMenuItems } from "@/utils/settingsMenuItem.tsx";
import PatientSummary from "@/pages/PatientSummary/PatientSummary.tsx";
import EmbeddedApp from "@/pages/EmbeddedApp/EmbeddedApp.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
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
    <SnackbarProvider maxSnack={1}>
      <TokenContextProvider>
        <ActivePageContextProvider>
          <PatientContextProvider>
            <UserContextProvider>
              <EncounterContextProvider>
                <QuestionnaireContextProvider>
                  <TooltipProvider delayDuration={100}>
                    <RouterProvider router={router} />
                  </TooltipProvider>
                </QuestionnaireContextProvider>
              </EncounterContextProvider>
            </UserContextProvider>
          </PatientContextProvider>
        </ActivePageContextProvider>
      </TokenContextProvider>
    </SnackbarProvider>
  );
}

export default App;
