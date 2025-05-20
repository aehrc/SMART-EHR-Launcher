import SettingsOverview from "@/pages/Settings/SettingsOverview.tsx";
import PatientSettings from "@/pages/Settings/PatientSettings/PatientSettings.tsx";
import UserSettings from "@/pages/Settings/UserSettings/UserSettings.tsx";
import EncounterSettings from "@/pages/Settings/EncounterSettings/EncounterSettings.tsx";
import AppLaunchSettings from "@/pages/Settings/AppLaunchSettings/AppLaunchSettings.tsx";
import QuestionnaireSettings from "@/pages/Settings/QuestionnaireSettings/QuestionnaireSettings.tsx";
import Presets from "@/pages/Settings/Presets/Presets.tsx";

export interface SettingsMenuItem {
  title: string;
  path: string;
  element: JSX.Element;
}

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    title: "Overview",
    path: "/settings",
    element: <SettingsOverview />,
  },
  {
    title: "Patient",
    path: "/settings/patient",
    element: <PatientSettings />,
  },
  {
    title: "User",
    path: "/settings/user",
    element: <UserSettings />,
  },
  {
    title: "Encounter",
    path: "/settings/encounter",
    element: <EncounterSettings />,
  },
  {
    title: "Questionnaire Context",
    path: "/settings/questionnaire",
    element: <QuestionnaireSettings />,
  },
  {
    title: "Presets",
    path: "/settings/presets",
    element: <Presets />,
  },
  {
    title: "App Launch",
    path: "/settings/app-launch",
    element: <AppLaunchSettings />,
  },
];
