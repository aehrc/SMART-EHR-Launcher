interface LinkProps {
  title: string;
  path: string;
  activePath: string;
  handleSwitchActivePage: (newPath: string) => void;
}

function Link(props: LinkProps) {
  const { title, path, activePath, handleSwitchActivePage } = props;

  return (
    <div
      key={path}
      className={`
            ${
              activePath === path
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            } cursor-pointer`}
      onClick={() => handleSwitchActivePage(path)}
    >
      {title}
    </div>
  );
}

export default Link;
