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

import { Button } from "@/components/ui/button.tsx";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  link: string;
  title: string;
}

function CopyButton(props: CopyButtonProps) {
  const { link, title } = props;

  const [isCopied, setIsCopied] = useState(false);

  function copyUrlToClipboard() {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true); // Set copied state to true
        setTimeout(() => {
          setIsCopied(false); // Revert back after 2 seconds
        }, 2000);
      })
      .catch((e) => {
        console.error("Failed to copy URL: ", e);
      });
  }

  return (
    <div className="flex items-center gap-x-0.5">
      {isCopied ? (
        <span className="text-xs text-muted-foreground">Copied!</span>
      ) : null}
      <Button
        variant="ghost"
        title={title}
        className="flex h-7 w-7 p-0 m-0 text-muted-foreground"
        onClick={copyUrlToClipboard}
      >
        {isCopied ? (
          <CheckCheck className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">{title}</span>
      </Button>
    </div>
  );
}

export default CopyButton;
