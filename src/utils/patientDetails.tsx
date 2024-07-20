import { Dayjs } from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";

// Condition functions and types
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
          <div className="font-medium">{row.getValue("condition") ?? "-"}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id") ?? "-"}
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
      sortingFn: (a, b) => {
        if (
          a.original.recordedDate === null ||
          b.original.recordedDate === null
        ) {
          return 0;
        }

        return a.original.recordedDate.diff(b.original.recordedDate);
      },
      cell: ({ row }) => {
        return row.original.recordedDate
          ? row.original.recordedDate.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}

// MedicationRequest functions and types
export interface MedicationTableData {
  id: string;
  medication: string;
  status: string;
  authoredOn: Dayjs | null;
}

export function createMedicationTableColumns(): ColumnDef<MedicationTableData>[] {
  return [
    {
      accessorKey: "medication",
      header: "Medication",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">{row.getValue("medication") ?? "-"}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.getValue("status") ? (
          <Badge variant="outline">{row.getValue("status")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "authoredOn",
      header: "Authored On",
      sortingFn: (a, b) => {
        if (a.original.authoredOn === null || b.original.authoredOn === null) {
          return 0;
        }

        return a.original.authoredOn.diff(b.original.authoredOn);
      },
      cell: ({ row }) => {
        return row.original.authoredOn
          ? row.original.authoredOn.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}

// AllergyIntolerances functions and types
export interface AllergyTableData {
  id: string;
  allergy: string;
  category: string;
  criticality: string;
  recordedDate: Dayjs | null;
}

export function createAllergyTableColumns(): ColumnDef<AllergyTableData>[] {
  return [
    {
      accessorKey: "allergy",
      header: "Allergy",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">{row.getValue("allergy") ?? "-"}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) =>
        row.getValue("category") ? (
          <Badge variant="outline">{row.getValue("category")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "criticality",
      header: "Criticality",
      cell: ({ row }) =>
        row.getValue("criticality") ? (
          <Badge variant="outline">{row.getValue("criticality")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "recordedDate",
      header: "Recorded Date",
      sortingFn: (a, b) => {
        if (
          a.original.recordedDate === null ||
          b.original.recordedDate === null
        ) {
          return 0;
        }

        return a.original.recordedDate.diff(b.original.recordedDate);
      },
      cell: ({ row }) => {
        return row.original.recordedDate
          ? row.original.recordedDate.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}

// Procedures functions and types
export interface ProcedureTableData {
  id: string;
  procedure: string;
  status: string;
  reason: string;
  performedOn: Dayjs | null;
}

export function createProcedureTableColumns(): ColumnDef<ProcedureTableData>[] {
  return [
    {
      accessorKey: "procedure",
      header: "Procedure",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">{row.getValue("procedure") ?? "-"}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.getValue("status") ? (
          <Badge variant="outline">{row.getValue("status")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => row.getValue("reason") ?? "-",
    },
    {
      accessorKey: "performedOn",
      header: "Performed On",
      sortingFn: (a, b) => {
        if (
          a.original.performedOn === null ||
          b.original.performedOn === null
        ) {
          return 0;
        }

        return a.original.performedOn.diff(b.original.performedOn);
      },
      cell: ({ row }) => {
        return row.original.performedOn
          ? row.original.performedOn.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}

// Immunizations functions and types
export interface ImmunizationTableData {
  id: string;
  immunization: string;
  status: string;
  occurrenceDate: Dayjs | null;
}

export function createImmunizationTableColumns(): ColumnDef<ImmunizationTableData>[] {
  return [
    {
      accessorKey: "immunization",
      header: "Immunization",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">
            {row.getValue("immunization") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("id") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.getValue("status") ? (
          <Badge variant="outline">{row.getValue("status")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => row.getValue("reason") ?? "-",
    },
    {
      accessorKey: "occurrenceDate",
      header: "Occurrence Date",
      sortingFn: (a, b) => {
        if (
          a.original.occurrenceDate === null ||
          b.original.occurrenceDate === null
        ) {
          return 0;
        }

        return a.original.occurrenceDate.diff(b.original.occurrenceDate);
      },
      cell: ({ row }) => {
        return row.original.occurrenceDate
          ? row.original.occurrenceDate.format("DD-MM-YYYY")
          : "-";
      },
    },
  ];
}
