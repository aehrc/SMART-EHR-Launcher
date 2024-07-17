import { cloneElement } from "react";
import { SidebarItem } from "@/utils/sidebarItem.ts";

interface SideBarMobileItemProps {
  sidebarItem: SidebarItem;
  activeTitle: string;
  onSwitchActivePage: (newPath: string) => void;
}

function SideBarMobileItem(props: SideBarMobileItemProps) {
  const { sidebarItem, onSwitchActivePage } = props;
  const { title, path, Icon } = sidebarItem;

  return (
    <a
      href="#"
      onClick={() => onSwitchActivePage(path)}
      className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
    >
      {cloneElement(Icon, { className: "h-5 w-5" })}
      {title}
    </a>
  );
}

export default SideBarMobileItem;
