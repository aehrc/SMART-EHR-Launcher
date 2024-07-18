import { Outlet } from "react-router-dom";
import useLoadResources from "../hooks/useLoadResources.ts";
import SideBar from "@/layout/Sidebar/SideBar.tsx";
import SideBarMobile from "@/layout/SidebarMobile/SideBarMobile.tsx";
import PatientNavProfile from "@/layout/NavProfiles/PatientNavProfile.tsx";
import UserNavProfile from "@/layout/NavProfiles/UserNavProfile.tsx";
import EncounterNavProfile from "@/layout/NavProfiles/EncounterNavProfile.tsx";
import QuestionnaireNavProfile from "@/layout/NavProfiles/QuestionnaireNavProfile.tsx";

function DashboardLayout() {
  useLoadResources();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SideBarMobile />
          <div className="flex-grow"></div>
          <PatientNavProfile />
          <UserNavProfile />
          <EncounterNavProfile />
          <QuestionnaireNavProfile />
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
