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
import useFetchPractitionerRoles from "@/hooks/useFetchPractitionerRoles.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

interface PractitionerRoleMenuLinkProps {
  title: string;
  path: string;
}

function PractitionerRoleMenuLink(props: PractitionerRoleMenuLinkProps) {
  const { title, path } = props;
  const { launch } = useLauncherQuery();
  const { activePath, switchActivePage } = useActivePage();

  const userId = launch.provider;

  const { practitionerRoles } = useFetchPractitionerRoles(userId ?? "");

  return (
    <div className="flex gap-1.5 items-center">
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
      <div
        key={practitionerRoles.length}
        className={`flex h-5 min-w-5 p-1 text-xs bg-red-500 text-white rounded-full justify-center items-center transition-colors animate-scale-up`}
      >
        {practitionerRoles.length}
      </div>
    </div>
  );
}

export default PractitionerRoleMenuLink;
