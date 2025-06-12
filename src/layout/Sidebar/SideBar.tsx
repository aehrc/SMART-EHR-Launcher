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

import { AppWindow, Settings, User } from "lucide-react";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import SideBarItem from "@/layout/Sidebar/SideBarItem.tsx";
import SideBarLogo from "@/layout/Sidebar/SideBarLogo.tsx";
import useActivePage from "@/hooks/useActivePage.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

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
            title: "Patient Details",
            path: "/",
            Icon: <User />,
          }}
          activePath={activePath}
          onSwitchActivePage={switchActivePage}
        />
        <SideBarItem
          sidebarItem={{
            title: "Settings",
            path: "/settings",
            Icon: <Settings />,
          }}
          activePath={activePath}
          onSwitchActivePage={switchActivePage}
        />
        {isEmbeddedView ? (
          <SideBarItem
            sidebarItem={{
              title: appName,
              path: "/embedded",
              Icon: <AppWindow />,
            }}
            activePath={activePath}
            onSwitchActivePage={switchActivePage}
          />
        ) : null}
      </nav>
    </aside>
  );
}

export default SideBar;
