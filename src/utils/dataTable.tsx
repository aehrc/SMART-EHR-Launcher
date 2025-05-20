import { ColumnDef } from "@tanstack/react-table";
import { Encounter, Patient, Practitioner, Questionnaire } from "fhir/r4";
import { Button } from "@/components/ui/button.tsx";
import { MousePointerClick, X } from "lucide-react";

// Patient functions and types
export interface PatientTableData {
  id: string;
  name: string;
  gender: string;
  dob: string;
  resourceType: string;
}

export function createPatientTableColumns(
  selectedPatient: Patient | null,
  onButtonClick: (selectedId: string) => void
): ColumnDef<PatientTableData>[] {
  const selectedPatientId = selectedPatient?.id ?? "";

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedPatientId === row.getValue("id")
              ? "font-medium text-blue-800"
              : ""
          }`}
        >
          {row.getValue("name") ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`px-2 py-0.5 rounded ${
              selectedPatientId === row.getValue("id")
                ? getSelectedDataIDColorClass(row.original.resourceType)
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {row.getValue("id") ?? ""}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedPatientId === row.getValue("id")
              ? "text-blue-800"
              : "text-muted-foreground"
          }`}
        >
          {row.getValue("gender") ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedPatientId === row.getValue("id")
              ? "text-blue-800"
              : "text-muted-foreground"
          }`}
        >
          {row.getValue("dob") ?? ""}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <>
          {selectedPatientId !== row.getValue("id") ? (
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 m-0"
              onClick={() => onButtonClick(row.getValue("id"))}
            >
              <MousePointerClick className="h-4 w-4" />
              <span className="sr-only">Set as context</span>
            </Button>
          ) : (
            <div className="flex h-8 w-8 p-0 m-0"></div>
          )}
        </>
      ),
    },
  ];
}

// User/Practitioner functions and types
export interface UserTableData {
  id: string;
  name: string;
  resourceType: string;
}

export function createUserTableColumns(
  selectedUser: Practitioner | null,
  onButtonClick: (selectedId: string) => void
): ColumnDef<UserTableData>[] {
  const selectedUserId = selectedUser?.id ?? "";

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedUserId === row.getValue("id")
              ? "font-medium text-purple-700"
              : ""
          }`}
        >
          {row.getValue("name") ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`px-2 py-0.5 rounded ${
              selectedUserId === row.getValue("id")
                ? getSelectedDataIDColorClass(row.original.resourceType)
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {row.getValue("id") ?? ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <>
          {selectedUserId !== row.getValue("id") ? (
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 m-0"
              onClick={() => onButtonClick(row.getValue("id"))}
            >
              <MousePointerClick className="h-4 w-4" />
              <span className="sr-only">Set as context</span>
            </Button>
          ) : (
            <div className="flex h-8 w-8 p-0 m-0"></div>
          )}
        </>
      ),
    },
  ];
}

// Encounter functions and types
export interface EncounterTableData {
  id: string;
  patientRef: string;
  resourceType: string;
}

export function createEncounterTableColumns(
  selectedEncounter: Encounter | null,
  selectedPatient: Patient | null,
  onButtonClick: (selectedId: string) => void
): ColumnDef<EncounterTableData>[] {
  const selectedEncounterId = selectedEncounter?.id ?? "";
  const selectedPatientId = selectedPatient?.id ?? "";

  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`px-2 py-0.5 rounded ${
              selectedEncounterId === row.getValue("id")
                ? "bg-orange-100 text-orange-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {row.getValue("id") ?? ""}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "patientRef",
      header: "Patient Reference",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`px-2 py-0.5 rounded ${
              selectedPatientId === row.getValue("id")
                ? "bg-orange-100 text-orange-700"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {row.getValue("patientRef") ?? ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 m-0"
          onClick={() => onButtonClick(row.getValue("id"))}
        >
          {selectedEncounterId === row.getValue("id") ? (
            <X className="h-4 w-4" />
          ) : (
            <MousePointerClick className="h-4 w-4" />
          )}
          <span className="sr-only">Set as context</span>
        </Button>
      ),
    },
  ];
}

// Questionnaire functions and types
export interface QuestionnaireTableData {
  id: string;
  name: string;
  resourceType: string;
}

export function createQuestionnaireTableColumns(
  selectedQuestionnaire: Questionnaire | null,
  onButtonClick: (selectedId: string) => void
): ColumnDef<QuestionnaireTableData>[] {
  const selectedQuestionnaireId = selectedQuestionnaire?.id ?? "";

  return [
    {
      accessorKey: "name",
      header: "Title",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedQuestionnaireId === row.getValue("id")
              ? "font-medium text-green-800"
              : ""
          }`}
        >
          {row.getValue("name") ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`px-2 py-0.5 rounded ${
              selectedQuestionnaireId === row.getValue("id")
                ? getSelectedDataIDColorClass(row.original.resourceType)
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {row.getValue("id") ?? ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 m-0"
          onClick={() => onButtonClick(row.getValue("id"))}
        >
          {selectedQuestionnaireId === row.getValue("id") ? (
            <X className="h-4 w-4" />
          ) : (
            <MousePointerClick className="h-4 w-4" />
          )}
          <span className="sr-only">Set as context</span>
        </Button>
      ),
    },
  ];
}

// Preset functions and types
interface LaunchContextIds {
  patient: string;
  practitioner: string;
  encounter?: string;
  questionnaire?: string;
}

export interface PresetTableData {
  id: string;
  description: string;
  contextIds: LaunchContextIds;
}

export function createPresetTableColumns(
  onButtonClick: (selectedId: string) => void
): ColumnDef<QuestionnaireTableData>[] {
  return [
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("description") ?? ""}</div>
      ),
    },
    {
      accessorKey: "contextIds",
      header: "Context IDs",
      cell: ({ row }) => (
        <div className="flex">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {row.getValue("contextIds") ?? ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 m-0"
          onClick={() => onButtonClick(row.getValue("id"))}
        >
          <MousePointerClick className="h-4 w-4" />
          <span className="sr-only">Select preset</span>
        </Button>
      ),
    },
  ];
}

// General functions
export function getSelectedDataIDColorClass(resourceType: string | null) {
  if (!resourceType) {
    return "bg-gray-100 text-gray-600";
  }

  switch (resourceType) {
    case "Patient":
      return "bg-blue-100 text-blue-800";
    case "Practitioner":
      return "bg-purple-100 text-purple-700";
    case "Encounter":
      return "bg-orange-100 text-orange-700";
    case "Questionnaire":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function getSelectedDataRowColorClass(resourceType: string | null) {
  if (!resourceType) {
    return "bg-gray-50 hover:bg-gray-50";
  }

  switch (resourceType) {
    case "Patient":
      return "bg-blue-50 hover:bg-blue-50";
    case "Practitioner":
      return "bg-purple-50 hover:bg-purple-50";
    case "Encounter":
      return "bg-orange-50 hover:bg-orange-50";
    case "Questionnaire":
      return "bg-green-50 hover:bg-green-50";
    default:
      return "bg-gray-50 hover:bg-gray-50";
  }
}
