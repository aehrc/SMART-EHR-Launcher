import { Button } from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  link: string;
  tooltipText: string;
}

function CopyButton(props: CopyButtonProps) {
  const { link, tooltipText } = props;

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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-7 w-7 p-0 m-0 text-muted-foreground"
            onClick={copyUrlToClipboard}
          >
            {isCopied ? (
              <CheckCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{tooltipText}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default CopyButton;
