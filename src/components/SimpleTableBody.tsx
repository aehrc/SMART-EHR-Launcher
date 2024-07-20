import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";
import DataTableEmpty from "@/components/DataTableEmpty.tsx";
import DataTableLoading from "@/components/DataTableLoading.tsx";

interface SimpleTableBodyProps<TData, TValue> {
  table: Table<TData>;
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
}

function SimpleTableBody(props: SimpleTableBodyProps<any, any>) {
  const { table, isLoading, columns } = props;

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
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
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

export default SimpleTableBody;
