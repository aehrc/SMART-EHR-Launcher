import { cloneElement } from "react";

export interface MenuItem {
  title: string;
  path: string;
  Icon: JSX.Element;
}

interface DashboardSideBarLogoProps {
  sidebarItem: MenuItem;
  onSwitchActivePage: (newTitle: string, newPath: string) => void;
}

function DashboardSideBarLogo(props: DashboardSideBarLogoProps) {
  const { sidebarItem, onSwitchActivePage } = props;
  const { title, path, Icon } = sidebarItem;

  return (
    <a
      href="#"
      onClick={() => onSwitchActivePage(title, path)}
      className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-green-700 md:h-8 md:w-8 md:text-base`}
    >
      {cloneElement(Icon, {
        className: "h-4 w-4 transition-all group-hover:scale-110",
      })}
      <span className="sr-only">{title}</span>
    </a>
  );
}

export default DashboardSideBarLogo;
