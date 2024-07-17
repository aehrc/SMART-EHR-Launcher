import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import DashboardSideBarItem from "@/layout/DashboardSideBarItem.tsx";
import DashboardSideBarLogo from "@/layout/DashboardSideBarLogo.tsx";

export interface MenuItem {
  title: string;
  path: string;
  Icon: JSX.Element;
}

const topMenuList: MenuItem[] = [
  {
    title: "Home",
    path: "/",
    Icon: <User />,
  },
];

function getRouteTitle(pathName: string): string {
  if (pathName === "/configuration") {
    return "Configuration";
  }

  const menuItem = topMenuList.find((item) => item.path === pathName);
  if (menuItem) {
    return menuItem.title;
  }

  return "";
}

// root component
function DashboardSideBar() {
  const navigate = useNavigate();

  const [activeTitle, setActiveTitle] = useState(
    getRouteTitle(window.location.pathname)
  );
  const { closeSnackbar } = useSnackbar();

  function handleSwitchActivePage(newTitle: string, newPath: string) {
    setActiveTitle(newTitle);
    closeSnackbar();
    navigate(newPath + window.location.search);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <DashboardSideBarLogo
          sidebarItem={{
            title: "Smart EHR Launcher",
            path: "/",
            Icon: <DataSaverOnIcon />,
          }}
          onSwitchActivePage={handleSwitchActivePage}
        />

        <DashboardSideBarItem
          sidebarItem={{
            title: "Patient Summary",
            path: "/",
            Icon: <User />,
          }}
          activeTitle={activeTitle}
          onSwitchActivePage={handleSwitchActivePage}
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <DashboardSideBarItem
          sidebarItem={{
            title: "Configuration",
            path: "/configuration",
            Icon: <Settings />,
          }}
          activeTitle={activeTitle}
          onSwitchActivePage={handleSwitchActivePage}
        />
      </nav>
    </aside>
  );
}

export default DashboardSideBar;
