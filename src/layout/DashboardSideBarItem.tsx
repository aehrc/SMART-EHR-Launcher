import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { cloneElement } from "react";

export interface MenuItem {
  title: string;
  path: string;
  Icon: JSX.Element;
}

interface DashboardSideBarItemProps {
  sidebarItem: MenuItem;
  activeTitle: string;
  onSwitchActivePage: (newTitle: string, newPath: string) => void;
}

function DashboardSideBarItem(props: DashboardSideBarItemProps) {
  const { sidebarItem, activeTitle, onSwitchActivePage } = props;
  const { title, path, Icon } = sidebarItem;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="#"
          onClick={() => onSwitchActivePage(title, path)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            activeTitle === title ? "text-primary" : "text-muted-foreground"
          } transition-colors hover:text-secondary-foreground md:h-8 md:w-8`}
        >
          {cloneElement(Icon, { className: "h-5 w-5" })}
          <span className="sr-only">{title}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}

export default DashboardSideBarItem;
