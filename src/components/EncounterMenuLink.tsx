import useActivePage from "@/hooks/useActivePage.ts";
import useFetchEncounters from "@/hooks/useFetchEncounters.ts";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";

interface EncounterMenuLinkProps {
  title: string;
  path: string;
}

function EncounterMenuLink(props: EncounterMenuLinkProps) {
  const { title, path } = props;
  const { launch } = useLauncherQuery();
  const { activePath, switchActivePage } = useActivePage();

  const patientId = launch.patient ?? null;

  const { encounters } = useFetchEncounters(patientId ?? "");

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
        key={encounters.length}
        className={`flex h-5 min-w-5 p-1 text-xs bg-red-500 text-white rounded-full justify-center items-center transition-colors animate-scale-up`}
      >
        {encounters.length}
      </div>
    </div>
  );
}

export default EncounterMenuLink;
