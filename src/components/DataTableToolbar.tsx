import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";
import DataTableToolbarSelected from "@/components/DataTableToolbarSelected.tsx";
import { FhirResource } from "fhir/r4";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedData: FhirResource | null;
}

function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table, selectedData } = props;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter results... (client side)"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-1 mt-0.5 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableToolbarSelected selectedData={selectedData} />
    </div>
  );
}

export default DataTableToolbar;
