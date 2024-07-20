import { FhirResource } from "fhir/r4";
import { getSelectedDataIDColorClass } from "@/utils/dataTable.tsx";

interface DataTableToolbarSelectedProps {
  selectedData: FhirResource | null;
}

function DataTableToolbarSelected(props: DataTableToolbarSelectedProps) {
  const { selectedData } = props;

  if (!selectedData || !selectedData.id) {
    return (
      <div className="text-sm text-muted-foreground">No item selected</div>
    );
  }

  const resourceType = selectedData.resourceType ?? null;

  return (
    <div className="text-sm text-muted-foreground">
      Selected ID:{" "}
      <span
        className={`px-2 py-0.5 rounded ${getSelectedDataIDColorClass(
          resourceType
        )}`}
      >
        {selectedData.id}
      </span>
    </div>
  );
}

export default DataTableToolbarSelected;
