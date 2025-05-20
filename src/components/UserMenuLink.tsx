import useActivePage from "@/hooks/useActivePage.ts";
import { useContext } from "react";
import { FhirServerContext } from "@/contexts/FhirServerContext.tsx";

interface UserMenuLinkProps {
  title: string;
  path: string;
}

function UserMenuLink(props: UserMenuLinkProps) {
  const { title, path } = props;
  const { activePath, switchActivePage } = useActivePage();

  const { fhirUser } = useContext(FhirServerContext);

  // Disabled user menu link if fhirUser is Practitioner.
  // This makes it so that a logged in practitioner User cannot switch users
  const userSwitchingDisabled = fhirUser
    ? fhirUser?.startsWith("Practitioner")
    : false;

  if (userSwitchingDisabled) {
    return null;
  }

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

export default UserMenuLink;
