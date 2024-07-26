import Header from "@/components/Header.tsx";
import UserSettings from "@/pages/Settings/UserSettings/UserSettings.tsx";

function InitialUserSelection() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header>
          <div className="h-16" />
        </Header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
          <div className="mx-auto grid w-full max-w-6xl gap-4">
            <UserSettings />
          </div>
        </main>
      </div>
    </div>
  );
}

export default InitialUserSelection;
