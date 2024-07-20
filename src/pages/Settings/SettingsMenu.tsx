import { configItems } from "@/utils/configItem.tsx";
import MenuLink from "@/components/MenuLink.tsx";

function SettingsMenu() {
  return (
    <nav className="grid gap-4">
      {configItems.map(({ title, path }) => (
        <MenuLink key={path} title={title} path={path} />
      ))}
    </nav>
  );
}

export default SettingsMenu;
