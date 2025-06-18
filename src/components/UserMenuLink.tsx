/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
