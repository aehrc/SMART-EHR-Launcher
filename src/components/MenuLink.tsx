import useActivePage from "@/hooks/useActivePage.ts";

interface MenuLinkProps {
  title: string;
  path: string;
}

function MenuLink(props: MenuLinkProps) {
  const { title, path } = props;
  const { activePath, switchActivePage } = useActivePage();

  return (
    <div
      key={path}
      className={`
            ${
              activePath === path
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            } cursor-pointer`}
      onClick={() => switchActivePage(path)}
    >
      {title}
    </div>
  );
}

export default MenuLink;
