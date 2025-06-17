/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { ConfigContext } from "@/contexts/ConfigContext.tsx";
import { useContext } from "react";
import { ConfigFile } from "@/utils/configFile.ts";
import ConfigChecker from "@/components/ConfigChecker.tsx";
import { X } from "lucide-react";

function App() {
  const { config, configIsLoading, configIsValid, loadConfigHasError } =
    useContext(ConfigContext);

  // config.json still loading
  if (configIsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border-gray-200 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        <div className="sr-only">Loading configuration</div>
      </div>
    );
  }

  // Error loading config.json
  if (loadConfigHasError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
          <X className="h-10 w-10 text-red-600" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Configuration Error
          </h2>
          <p className="text-sm text-gray-600">
            Unable to load configuration file. View the console for details.
          </p>
        </div>
      </div>
    );
  }

  // config.json loaded but did not pass type validation
  if (!configIsValid) {
    return <ConfigChecker config={config as Partial<ConfigFile>} />;
  }

  // config.json loaded and valid, proceed with the app
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
          path: "embedded",
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
