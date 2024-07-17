import { configItem } from "@/utils/configItem.ts";
import Link from "@/components/Link.tsx";

interface SettingsMenuProps {
  activePath: string;
  handleSwitchActivePage: (newPath: string) => void;
}

function SettingsMenu(props: SettingsMenuProps) {
  const { activePath, handleSwitchActivePage } = props;

  return (
    <nav className="grid gap-4 text-sm">
      {configItem.map(({ title, path }) => (
        <Link
          title={title}
          path={path}
          activePath={activePath}
          handleSwitchActivePage={handleSwitchActivePage}
        />
      ))}
    </nav>
  );
}

export default SettingsMenu;
