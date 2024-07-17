import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { PanelLeft, Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SideBarMobileLogo from "@/layout/SidebarMobile/SideBarMobileLogo.tsx";
import SideBarMobileItem from "@/layout/SidebarMobile/SideBarMobileItem.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";

function SideBarMobile() {
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(window.location.pathname);
  const { closeSnackbar } = useSnackbar();

  function handleSwitchActivePage(newPath: string) {
    setActivePath(newPath);
    closeSnackbar();
    navigate(newPath + window.location.search);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <SideBarMobileLogo
            sidebarItem={{
              title: "Smart EHR Launcher",
              path: "/",
              Icon: <DataSaverOnIcon fontSize="large" />,
            }}
            onSwitchActivePage={handleSwitchActivePage}
          />

          <SideBarMobileItem
            sidebarItem={{
              title: "Patient Summary",
              path: "/",
              Icon: <User />,
            }}
            activeTitle={activePath}
            onSwitchActivePage={handleSwitchActivePage}
          />
          <SideBarMobileItem
            sidebarItem={{
              title: "Settings",
              path: "/settings",
              Icon: <Settings />,
            }}
            activeTitle={activePath}
            onSwitchActivePage={handleSwitchActivePage}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SideBarMobile;
