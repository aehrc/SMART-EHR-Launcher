import { theme } from "./Theme";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Configuration from "./pages/Configuration/Configuration";
import PatientSummary from "./pages/PatientSummary/PatientSummary";
import PatientContextProvider from "./contexts/PatientContext";
import DashboardLayout from "./layout/DashboardLayout";
import { SnackbarProvider } from "notistack";
import TitleContextProvider from "./contexts/TitleContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext.tsx";

function App() {
  const appTheme = theme();

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
          path: "configuration",
          element: <Configuration />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider maxSnack={1}>
        <TitleContextProvider>
          <QuestionnaireContextProvider>
            <PatientContextProvider>
              <CssBaseline />
              <RouterProvider router={router} />
            </PatientContextProvider>
          </QuestionnaireContextProvider>
        </TitleContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
