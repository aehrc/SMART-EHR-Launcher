import { Outlet } from "react-router-dom";
import SideBar from "@/layout/Sidebar/SideBar.tsx";
import SideBarMobile from "@/layout/SidebarMobile/SideBarMobile.tsx";
import PatientNavProfile from "@/layout/NavProfiles/PatientNavProfile.tsx";
import UserNavProfile from "@/layout/NavProfiles/UserNavProfile.tsx";
import EncounterNavProfile from "@/layout/NavProfiles/EncounterNavProfile.tsx";
import QuestionnaireNavProfile from "@/layout/NavProfiles/QuestionnaireNavProfile.tsx";
import Header from "@/components/Header.tsx";
import CopyButton from "@/components/CopyButton.tsx";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header>
          <SideBarMobile />
          <div className="flex-grow" />

          <span className=" -mr-2">
            <CopyButton
              link={window.location.href}
              tooltipText="Copy EHR link with context"
            />
          </span>
          <PatientNavProfile />
          <UserNavProfile />
          <EncounterNavProfile />
          <QuestionnaireNavProfile />
        </Header>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
