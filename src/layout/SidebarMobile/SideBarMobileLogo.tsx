import { cloneElement } from "react";
import { SidebarItem } from "@/utils/sidebarItem.ts";

interface SideBarMobileLogoProps {
  sidebarItem: SidebarItem;
  onSwitchActivePage: (newPath: string) => void;
}

function SideBarMobileLogo(props: SideBarMobileLogoProps) {
  const { sidebarItem, onSwitchActivePage } = props;
  const { title, path, Icon } = sidebarItem;

  return (
    <a
      href="#"
      onClick={() => onSwitchActivePage(path)}
      className="group flex h-10 w-10 items-center justify-center text-green-700"
    >
      {cloneElement(Icon, {
        className: "transition-all group-hover:scale-110",
      })}
      <span className="sr-only">{title}</span>
    </a>
  );
}

export default SideBarMobileLogo;
