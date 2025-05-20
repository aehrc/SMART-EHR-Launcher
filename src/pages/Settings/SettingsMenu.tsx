import { settingsMenuItems } from "@/utils/settingsMenuItem.tsx";
import MenuLink from "@/components/MenuLink.tsx";
import EncounterMenuLink from "@/components/EncounterMenuLink.tsx";
import UserMenuLink from "@/components/UserMenuLink.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import PresetsMenuLink from "@/components/PresetsMenuLink.tsx";

function SettingsMenu() {
  const overviewMenuItem = settingsMenuItems[0];
  const launchContextMenuItems = settingsMenuItems.slice(1, 6);
  const appLaunchMenuItem = settingsMenuItems[6];

  return (
    <nav className="grid gap-4">
      <MenuLink title={overviewMenuItem.title} path={overviewMenuItem.path} />
      <Separator orientation="horizontal" />

      {launchContextMenuItems.map(({ title, path }) => {
        if (title === "Encounter") {
          return <EncounterMenuLink key={path} title={title} path={path} />;
        }

        if (title === "User") {
          return <UserMenuLink key={path} title={title} path={path} />;
        }

        if (title === "Presets") {
          return <PresetsMenuLink key={path} title={title} path={path} />;
        }

        return <MenuLink key={path} title={title} path={path} />;
      })}
      <Separator orientation="horizontal" />
      <MenuLink title={appLaunchMenuItem.title} path={appLaunchMenuItem.path} />
    </nav>
  );
}

export default SettingsMenu;
