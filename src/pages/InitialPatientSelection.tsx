import Header from "@/components/Header.tsx";
import UserNavProfile from "@/layout/NavProfiles/UserNavProfile.tsx";
import PatientSettings from "@/pages/Settings/PatientSettings/PatientSettings.tsx";
import Footer from "@/components/ui/Footer.tsx";

function InitialPatientSelection() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header>
          <div className="flex-grow" />
          <UserNavProfile />
        </Header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
          <div className="mx-auto grid w-full max-w-6xl gap-4">
            <PatientSettings showEncounterContext={false} />
          </div>
        </main>
      </div>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}

export default InitialPatientSelection;
