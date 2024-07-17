import useTitle from "../../hooks/useTitle.ts";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Outlet, useNavigate } from "react-router-dom";
import SettingsMenu from "@/pages/Settings/SettingsMenu.tsx";

function Settings() {
  useTitle("Settings");

  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(window.location.pathname);
  const { closeSnackbar } = useSnackbar();

  function handleSwitchActivePage(newPath: string) {
    setActivePath(newPath);
    closeSnackbar();
    navigate(newPath + window.location.search);
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SettingsMenu
          activePath={activePath}
          handleSwitchActivePage={handleSwitchActivePage}
        />
        <Outlet />
      </div>
    </main>
  );
}

export default Settings;
