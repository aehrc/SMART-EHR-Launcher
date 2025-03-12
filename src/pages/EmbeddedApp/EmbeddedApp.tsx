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
  const [isResizing, setIsResizing] = useState(false);

  return (
    <main className="flex w-full p-4 sm:px-6 sm:py-0">
      <div
        className={`flex flex-col mx-auto w-full gap-1 ${
          expanded ? "" : "max-w-6xl"
        }`}
      >
        <div className="flex justify-between">
          <div className="text-xl font-semibold">{appName}</div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse View" : "Expand view"}{" "}
            <UnfoldHorizontal className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative min-h-[500px]">
          {/* Backdrop when iframe is being resized */}
          {isResizing && (
            <div className="absolute inset-0 bg-black bg-opacity-75 z-10 rounded-lg flex items-center justify-center pointer-events-none transition-opacity">
              <div className="text-center text-white p-4 max-w-sm">
                <div className="font-semibold">Resizing in Progress</div>
                <div className="text-sm mt-1">
                  Iframe is currently being resized for optimal viewing.
                </div>
              </div>
            </div>
          )}

          <Resizable
            minHeight={500}
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
            onResizeStart={() => setIsResizing(true)}
            onResizeStop={() => setIsResizing(false)}
          >
            <iframe
              src={launchUrl.href}
              className="border-2 w-full h-full min-w-[675px] min-h-[500px] rounded-lg "
            />
          </Resizable>
        </div>
        <div className="text-xs text-muted-foreground mt-2 mb-20">
          The iframe is resizable. You can drag the bottom edge to adjust the
          height as needed.
        </div>
      </div>
    </main>
  );
}

export default EmbeddedApp;
