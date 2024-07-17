import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SideBarItem from "@/layout/Sidebar/SideBarItem.tsx";
import SideBarLogo from "@/layout/Sidebar/SideBarLogo.tsx";

// root component
function SideBar() {
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(window.location.pathname);
  const { closeSnackbar } = useSnackbar();

  function handleSwitchActivePage(newPath: string) {
    setActivePath(newPath);
    closeSnackbar();
    navigate(newPath + window.location.search);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <SideBarLogo
          sidebarItem={{
            title: "Smart EHR Launcher",
            path: "/",
            Icon: <DataSaverOnIcon fontSize="large" />,
          }}
          onSwitchActivePage={handleSwitchActivePage}
        />

        <SideBarItem
          sidebarItem={{
            title: "Patient Summary",
            path: "/",
            Icon: <User />,
          }}
          activePath={activePath}
          onSwitchActivePage={handleSwitchActivePage}
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SideBarItem
          sidebarItem={{
            title: "Settings",
            path: "/settings",
            Icon: <Settings />,
          }}
          activePath={activePath}
          onSwitchActivePage={handleSwitchActivePage}
        />
      </nav>
    </aside>
  );
}

export default SideBar;
