import { ColumnDef } from "@tanstack/react-table";
import { FhirResource, Questionnaire } from "fhir/r4";
import { Button } from "@/components/ui/button.tsx";
import { MousePointerClick, X } from "lucide-react";

export function createQuestionnaireTableColumns(
  selectedQuestionnaire: Questionnaire | null,
  onButtonClick: (selectedId: string) => void
): ColumnDef<Questionnaire>[] {
  const selectedQuestionnaireId = selectedQuestionnaire?.id ?? "";

  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div
          className={`text-sm ${
            selectedQuestionnaireId === row.getValue("id")
              ? "font-medium text-green-800"
              : ""
          }`}
        >
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex">
          <div
            className={`text-xs px-2 py-0.5 rounded ${
              selectedQuestionnaireId === row.getValue("id")
                ? getSelectedDataIDColorClass(row.original)
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {row.getValue("id")}
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

export function getSelectedDataIDColorClass(selectedData: FhirResource | null) {
  if (!selectedData || !selectedData.id) {
    return "bg-gray-100 text-gray-600";
  }

  switch (selectedData.resourceType) {
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

export function getSelectedDataRowColorClass(
  selectedData: FhirResource | null
) {
  if (!selectedData || !selectedData.id) {
    return "bg-gray-50 hover:bg-gray-50";
  }

  switch (selectedData.resourceType) {
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
