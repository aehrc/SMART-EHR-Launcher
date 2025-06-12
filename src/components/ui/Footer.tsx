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

import csiroLogo from "../../img/csiro-logo.png";
import { Separator } from "@/components/ui/separator.tsx";

function Footer() {
  return (
    <footer className="pt-5 pb-2.5 m-auto">
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-x-2">
          <div className="text-xs text-muted-foreground">Built by</div>
          <img src={csiroLogo} alt="CSIRO Logo" className="h-7 w-7" />
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="text-xs">
          <span className="text-muted-foreground">
            The source code is available on{" "}
            <a
              href="https://github.com/aehrc/smart-ehr-launcher"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
