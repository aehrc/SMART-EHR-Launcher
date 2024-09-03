import useLauncherQuery from "../../hooks/useLauncherQuery";
import { getValidationErrors } from "../../lib/URLValidation";
import { getLaunchUrl } from "../../lib/launchUrl";
import { ArrowRight, CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import useActivePage from "@/hooks/useActivePage.ts";
import CopyButton from "@/components/CopyButton.tsx";

function LaunchButton() {
  // The URL to launch the user-specified app
  const { query, launch } = useLauncherQuery();

  const { switchActivePage } = useActivePage();

  const launchUrl = getLaunchUrl(query, launch);

  const isEmbeddedView = launch.is_embedded_view;
  const appName = query.app_name !== "" ? query.app_name : "SMART app";

  const validationErrors = getValidationErrors(launch, query);

  if (isEmbeddedView) {
    return (
      <div className="flex items-center gap-2">
        <Button
          className="text-white bg-blue-500 hover:bg-blue-600"
          disabled={validationErrors.length > 0}
          onClick={() => switchActivePage("/embedded")}
        >
          View embedded {appName}
        </Button>
        {validationErrors.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleAlert className="text-red-700" />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Invalid app launch URL
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CopyButton link={launchUrl.href} tooltipText="Copy app launch link" />
      <a
        href={launchUrl.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${
          validationErrors.length > 0 ? "pointer-events-none" : ""
        }`}
      >
        <Button
          className="text-white bg-blue-500 hover:bg-blue-600"
          disabled={validationErrors.length > 0}
        >
          Launch {appName} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </a>
      {validationErrors.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleAlert className="text-red-700" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Invalid app launch URL</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default LaunchButton;
