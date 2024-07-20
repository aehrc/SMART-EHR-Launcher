import { Dayjs } from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";

export interface ConditionTableData {
  id: string;
  condition: string;
  clinicalStatus: string;
  onsetDate: Dayjs | null;
  recordedDate: Dayjs | null;
}

export function createConditionTableColumns(): ColumnDef<ConditionTableData>[] {
  return [
    {
      accessorKey: "condition",
      header: "Condition",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">{row.getValue("condition")}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "clinicalStatus",
      header: "Clinical Status",
      cell: ({ row }) =>
        row.getValue("clinicalStatus") ? (
          <Badge variant="outline">{row.getValue("clinicalStatus")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "onsetDate",
      header: "Onset Date",
      cell: ({ row }) => {
        return row.original.onsetDate
          ? row.original.onsetDate.format("DD-MM-YYYY")
          : "-";
      },
    },
    {
      accessorKey: "recordedDate",
      header: "Recorded Date",
      cell: ({ row }) => {
        return row.original.recordedDate
          ? row.original.recordedDate.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}
