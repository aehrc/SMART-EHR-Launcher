import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Configuration from "./pages/Configuration/Configuration";
import PatientSummary from "./pages/PatientSummary/PatientSummary";
import PatientContextProvider from "./contexts/PatientContext";
import DashboardLayout from "./layout/DashboardLayout";
import { SnackbarProvider } from "notistack";
import TitleContextProvider from "./contexts/TitleContext";
import TokenContextProvider from "./contexts/TokenContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext.tsx";
import UserContextProvider from "./contexts/UserContext.tsx";

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
    <SnackbarProvider maxSnack={1}>
      <TokenContextProvider>
        <TitleContextProvider>
          <QuestionnaireContextProvider>
            <PatientContextProvider>
              <UserContextProvider>
                hello
                <RouterProvider router={router} />
              </UserContextProvider>
            </PatientContextProvider>
          </QuestionnaireContextProvider>
        </TitleContextProvider>
      </TokenContextProvider>
    </SnackbarProvider>
  );
}

export default App;
