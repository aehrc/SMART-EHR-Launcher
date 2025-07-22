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

import { Outlet } from "react-router-dom";
import SideBar from "@/layout/Sidebar/SideBar.tsx";
import SideBarMobile from "@/layout/SidebarMobile/SideBarMobile.tsx";
import PatientNavProfile from "@/layout/NavProfiles/PatientNavProfile.tsx";
import UserNavProfile from "@/layout/NavProfiles/UserNavProfile.tsx";
import EncounterNavProfile from "@/layout/NavProfiles/EncounterNavProfile.tsx";
import FhirContextNavProfile from "@/layout/NavProfiles/FhirContextNavProfile.tsx";
import Header from "@/components/Header.tsx";
import CopyButton from "@/components/CopyButton.tsx";
import Footer from "@/components/ui/Footer.tsx";

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
              title="Copy EHR link with context"
            />
          </span>
          <PatientNavProfile />
          <UserNavProfile />
          <EncounterNavProfile />
          <FhirContextNavProfile />
        </Header>
        <Outlet />
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}

export default DashboardLayout;
