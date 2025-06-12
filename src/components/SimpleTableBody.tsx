/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
