import { TooltipProvider } from "@/components/ui/tooltip";
import TitleContextProvider from "@/contexts/TitleContext.tsx";
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
import SettingsOverview from "@/pages/Settings/SettingsOverview.tsx";
import PatientSettings from "@/pages/Settings/PatientSettings/PatientSettings.tsx";
import UserSettings from "@/pages/Settings/UserSettings/UserSettings.tsx";
import AppLaunchSettings from "@/pages/Settings/AppLaunchSettings/AppLaunchSettings.tsx";
import QuestionnaireSettings from "@/pages/Settings/QuestionnaireSettings/QuestionnaireSettings.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <></>,
        },
        {
          path: "settings",
          element: <Settings />,
          children: [
            {
              path: "",
              element: <SettingsOverview />,
            },
            {
              path: "patient",
              element: <PatientSettings />,
            },
            {
              path: "user",
              element: <UserSettings />,
            },
            {
              path: "app-launch",
              element: <AppLaunchSettings />,
            },
            {
              path: "questionnaire",
              element: <QuestionnaireSettings />,
            },
          ],
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
        <TitleContextProvider>
          <QuestionnaireContextProvider>
            <PatientContextProvider>
              <UserContextProvider>
                <TooltipProvider delayDuration={150}>
                  <RouterProvider router={router} />
                </TooltipProvider>
              </UserContextProvider>
            </PatientContextProvider>
          </QuestionnaireContextProvider>
        </TitleContextProvider>
      </TokenContextProvider>
    </SnackbarProvider>
  );
}

export default App;
