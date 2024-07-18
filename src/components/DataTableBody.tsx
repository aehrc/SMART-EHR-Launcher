import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import DataTableEmpty from "@/components/DataTableEmpty.tsx";
import DataTableLoading from "@/components/DataTableLoading.tsx";
import { FhirResource } from "fhir/r4";
import { getSelectedDataRowColorClass } from "@/utils/dataTable.tsx";

interface DataTableBodyProps<TData, TValue> {
  table: Table<TData>;
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  selectedData: FhirResource | null;
}

function DataTableBody(props: DataTableBodyProps<any, any>) {
  const { table, isLoading, columns, selectedData } = props;

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          <DataTableLoading />
        </TableCell>
      </TableRow>
    );
  }

  if (table.getRowModel().rows?.length) {
    return (
      <>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={` ${
              selectedData?.id === row.getValue("id")
                ? getSelectedDataRowColorClass(selectedData)
                : ""
            }`}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <DataTableEmpty />
      </TableCell>
    </TableRow>
  );
}

export default DataTableBody;
