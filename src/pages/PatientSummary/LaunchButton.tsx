import useLauncherQuery from "../../hooks/useLauncherQuery";
import { getValidationErrors } from "../../lib/URLValidation";
import { ArrowRight, CircleAlert, Loader2, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import useActivePage from "@/hooks/useActivePage.ts";
import CopyButton from "@/components/CopyButton.tsx";
import useAidboxFetchLaunchUri from "@/hooks/useAidboxFetchLaunchUri.ts";

function LaunchButton() {
  // The URL to launch the user-specified app
  const { query, launch } = useLauncherQuery();

  const { switchActivePage } = useActivePage();

  let { launchUri, isInitialLoading } = useAidboxFetchLaunchUri();

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

  const buttonIsDisabled =
    validationErrors.length > 0 || isInitialLoading || !launchUri;

  return (
    <div className="flex items-center gap-2">
      {isInitialLoading ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <RefreshCcw className="text-muted-foreground h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent side="left">Fetching launch URI...</TooltipContent>
        </Tooltip>
      ) : null}

      {launchUri && !buttonIsDisabled ? (
        <CopyButton link={launchUri} tooltipText="Copy app launch link" />
      ) : null}
      <div className={buttonIsDisabled ? "cursor-not-allowed" : ""}>
        <a
          href={launchUri ?? ""}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonIsDisabled ? "pointer-events-none" : ""}
        >
          <Button
            className="text-white bg-blue-500 hover:bg-blue-600"
            disabled={buttonIsDisabled}
          >
            Launch {appName}{" "}
            {isInitialLoading ? (
              <Loader2 className="animate-spin ml-2 h-4 w-4" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </a>
      </div>

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
