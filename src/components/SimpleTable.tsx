import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import SimpleTableBody from "@/components/SimpleTableBody.tsx";

interface SimpleTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  initialSorting?: SortingState;
}

function SimpleTable<TData, TValue>(props: SimpleTableProps<TData, TValue>) {
  const { data, columns, isLoading, initialSorting } = props;

  const table = useReactTable({
    data,
    columns,
    rowCount: 1,
    initialState: {
      sorting: initialSorting,
    },
    manualPagination: true, // To show all rows within one page
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <SimpleTableBody
            table={table}
            columns={columns}
            isLoading={isLoading}
          />
        </TableBody>
      </Table>
      <div className="text-xs text-muted-foreground">
        <b>{table.getFilteredRowModel().rows.length}</b> results found
      </div>
    </div>
  );
}

export default SimpleTable;
