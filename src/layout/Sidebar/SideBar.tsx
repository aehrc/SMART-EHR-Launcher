import { AppWindow, Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SideBarItem from "@/layout/Sidebar/SideBarItem.tsx";
import SideBarLogo from "@/layout/Sidebar/SideBarLogo.tsx";
import useActivePage from "@/hooks/useActivePage.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

// root component
function SideBar() {
  const { activePath, switchActivePage } = useActivePage();

  const { query, launch } = useLauncherQuery();

  const isEmbeddedView = launch.is_embedded_view;
  const appName = query.app_name !== "" ? query.app_name : "SMART app";

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <SideBarLogo
          sidebarItem={{
            title: "Smart EHR Launcher",
            path: "/",
            Icon: <DataSaverOnIcon fontSize="large" />,
          }}
          onSwitchActivePage={switchActivePage}
        />

        <SideBarItem
          sidebarItem={{
            title: "Patient Summary",
            path: "/",
            Icon: <User />,
          }}
          activePath={activePath}
          onSwitchActivePage={switchActivePage}
        />

        {isEmbeddedView ? (
          <SideBarItem
            sidebarItem={{
              title: appName,
              path: "/embedded-app",
              Icon: <AppWindow />,
            }}
            activePath={activePath}
            onSwitchActivePage={switchActivePage}
          />
        ) : null}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SideBarItem
          sidebarItem={{
            title: "Settings",
            path: "/settings",
            Icon: <Settings />,
          }}
          activePath={activePath}
          onSwitchActivePage={switchActivePage}
        />
      </nav>
    </aside>
  );
}

export default SideBar;
