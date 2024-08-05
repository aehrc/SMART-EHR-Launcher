import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { getLaunchUrl } from "@/lib/launchUrl.ts";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { UnfoldHorizontal } from "lucide-react";

function EmbeddedApp() {
  const { query, launch } = useLauncherQuery();

  const launchUrl = getLaunchUrl(query, launch);

  const appName = query.app_name !== "" ? query.app_name : "SMART app";

  const [expanded, setExpanded] = useState(false);

  return (
    <main className="flex w-full p-4 sm:px-6 sm:py-0">
      <div
        className={`flex flex-col mx-auto w-full gap-4 ${
          expanded ? "" : "max-w-6xl"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{appName}</h1>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse View" : "Expand view"}{" "}
            {expanded ? (
              <UnfoldHorizontal className="ml-2 h-4 w-4" />
            ) : (
              <UnfoldHorizontal className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Resizable
            defaultSize={{
              width: "auto",
              height: "auto",
            }}
            enable={{
              top: false,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
          >
            <iframe
              src={launchUrl.href}
              className="border-2 w-full h-full min-w-[675px] min-h-[500px] rounded-lg "
            />
          </Resizable>
          <div className="text-xs text-muted-foreground mb-20">
            The iframe is resizable. You can drag the bottom edge to adjust the
            height as needed.
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmbeddedApp;
