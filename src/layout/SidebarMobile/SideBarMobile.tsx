import { AppWindow, PanelLeft, Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SideBarMobileLogo from "@/layout/SidebarMobile/SideBarMobileLogo.tsx";
import SideBarMobileItem from "@/layout/SidebarMobile/SideBarMobileItem.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";
import useActivePage from "@/hooks/useActivePage.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

function SideBarMobile() {
  const { switchActivePage } = useActivePage();

  const { query, launch } = useLauncherQuery();

  const isEmbeddedView = launch.is_embedded_view;
  const appName = query.app_name !== "" ? query.app_name : "SMART app";

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
            onSwitchActivePage={switchActivePage}
          />

          <SideBarMobileItem
            sidebarItem={{
              title: "Patient Summary",
              path: "/",
              Icon: <User />,
            }}
            onSwitchActivePage={switchActivePage}
          />
          <SideBarMobileItem
            sidebarItem={{
              title: "Settings",
              path: "/settings",
              Icon: <Settings />,
            }}
            onSwitchActivePage={switchActivePage}
          />
          {isEmbeddedView ? (
            <SideBarMobileItem
              sidebarItem={{
                title: appName,
                path: "/embedded-app",
                Icon: <AppWindow />,
              }}
              onSwitchActivePage={switchActivePage}
            />
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SideBarMobile;
