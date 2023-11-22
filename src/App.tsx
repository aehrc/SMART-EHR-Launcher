import { theme } from "./Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Configuration from "./pages/Configuration/Configuration";
import PatientSummary from "./pages/PatientSummary/PatientSummary";
import PatientContextProvider from "./contexts/PatientContext";
import DashboardLayout from "./layout/DashboardLayout";
import { SnackbarProvider } from "notistack";
import TitleContextProvider from "./contexts/TitleContext";
import TokenContextProvider from "./contexts/TokenContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext.tsx";

function App() {
  const appTheme = theme();

  const router = createBrowserRouter([
    {
      path: "/ehr",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <PatientSummary />,
        },
        {
          path: "configuration",
          element: <Configuration />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={1}>
        <TokenContextProvider>
          <TitleContextProvider>
            <QuestionnaireContextProvider>
              <PatientContextProvider>
                <CssBaseline />
                <RouterProvider router={router} />
              </PatientContextProvider>
            </QuestionnaireContextProvider>
          </TitleContextProvider>
        </TokenContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
