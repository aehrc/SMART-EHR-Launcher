import { settingsMenuItems } from "@/utils/settingsMenuItem.tsx";
import MenuLink from "@/components/MenuLink.tsx";
import EncounterMenuLink from "@/components/EncounterMenuLink.tsx";
import UserMenuLink from "@/components/UserMenuLink.tsx";

function SettingsMenu() {
  return (
    <nav className="grid gap-4">
      {settingsMenuItems.map(({ title, path }) => {
        if (title === "Encounter") {
          return <EncounterMenuLink key={path} title={title} path={path} />;
        }

        if (title === "User") {
          return <UserMenuLink key={path} title={title} path={path} />;
        }

        return <MenuLink key={path} title={title} path={path} />;
      })}
    </nav>
  );
}

export default SettingsMenu;
