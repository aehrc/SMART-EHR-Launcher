export interface ConfigItem {
  title: string;
  path: string;
}

export const configItem: ConfigItem[] = [
  {
    title: "General",
    path: "/settings",
  },
  {
    title: "Patient",

    path: "/settings/patient",
  },
  {
    title: "User",
    path: "/settings/user",
  },
  {
    title: "App Launch",
    path: "/settings/app-launch",
  },
  {
    title: "Questionnaire Context",
    path: "/settings/questionnaire",
  },
];
