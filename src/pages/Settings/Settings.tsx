import { Outlet } from "react-router-dom";
import SettingsMenu from "@/pages/Settings/SettingsMenu.tsx";

function Settings() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-4 md:grid-cols-[180px_1fr]">
        <SettingsMenu />
        <Outlet />
      </div>
    </main>
  );
}

export default Settings;
