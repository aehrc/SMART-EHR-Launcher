import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header(props: HeaderProps) {
  const { children } = props;
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {children}
    </header>
  );
}

export default Header;
