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

import dayjs, { Dayjs } from "dayjs";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { Observation, ObservationComponent, Period } from "fhir/r4";

// Encounter functions and types
export interface EncounterTableData {
  id: string;
  type: string;
  class: string;
  status: string;
  period: Period | null;
}

export function createEncounterTableColumns(): ColumnDef<EncounterTableData>[] {
  return [
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="flex">
          <div className="font-medium">{row.getValue("type") ?? "-"}</div>
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
      accessorKey: "class",
      header: "Class",
      cell: ({ row }) => (
        <div className="flex">
          <div className="capitalize">{row.getValue("class") ?? "-"}</div>
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
      accessorKey: "period",
      header: "Period",
      sortingFn: (a, b) => {
        const dateOrMax = (date: string | undefined) =>
          date ? dayjs(date) : dayjs("9999-12-31");

        // Compare start dates first
        const aStart = dateOrMax(a.original.period?.start);
        const bStart = dateOrMax(b.original.period?.start);

        if (aStart.isBefore(bStart)) return -1;
        if (aStart.isAfter(bStart)) return 1;

        // If start dates are equal, compare end dates
        const aEnd = dateOrMax(a.original.period?.end);
        const bEnd = dateOrMax(b.original.period?.end);

        if (aEnd.isBefore(bEnd)) return -1;
        if (aEnd.isAfter(bEnd)) return 1;

        return 0;
      },
      cell: ({ row }) => {
        const { start, end } = row.original.period || {};

        if (start && end) {
          return `
              ${dayjs(start).format("DD/MM/YYYY")} - 
              ${dayjs(end).format("DD/MM/YYYY")}`;
        } else if (start) {
          return dayjs(start).format("DD/MM/YYYY");
        } else if (end) {
          return `Unknown - ${dayjs(end).format("DD/MM/YYYY")}`;
        } else {
          return "-";
        }
      },
    },
  ];
}

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
          ? row.original.onsetDate.format("DD/MM/YYYY")
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
          ? row.original.recordedDate.format("DD/MM/YYYY")
          : "-";
      },
    },
  ];
}

// MedicationRequest functions and types
export interface MedicationRequestTableData {
  id: string;
  medication: string;
  status: string;
  authoredOn: Dayjs | string | null;
}

export function createMedicationRequestTableColumns(): ColumnDef<MedicationRequestTableData>[] {
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
        if (
          a.original.authoredOn === null ||
          b.original.authoredOn === null ||
          typeof a.original.authoredOn === "string" ||
          typeof b.original.authoredOn === "string"
        ) {
          return 0;
        }

        return a.original.authoredOn.diff(b.original.authoredOn);
      },
      cell: ({ row }) => {
        if (typeof row.original.authoredOn === "string") {
          return "*" + row.original.authoredOn;
        }

        return row.original.authoredOn
          ? row.original.authoredOn.format("DD/MM/YYYY")
          : "-";
      },
    },
  ];
}

// AllergyIntolerances functions and types
export interface AllergyTableData {
  id: string;
  allergy: string;
  verificationStatus: string;
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
      accessorKey: "verificationStatus",
      header: "Verification Status",
      cell: ({ row }) =>
        row.getValue("verificationStatus") ? (
          <Badge variant="outline">{row.getValue("verificationStatus")}</Badge>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) =>
        row.getValue("category") ? row.getValue("category") : "-",
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
          ? row.original.recordedDate.format("DD/MM/YYYY")
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
      cell: ({ row }) =>
        row.getValue("reason") ? row.getValue("reason") : "-",
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
          ? row.original.performedOn.format("DD/MM/YYYY")
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
      cell: ({ row }) =>
        row.getValue("reason") ? row.getValue("reason") : "-",
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
          ? row.original.occurrenceDate.format("DD/MM/YYYY")
          : "-";
      },
    },
  ];
}

// Observations functions and types
export interface ObservationTableData {
  id: string;
  observation: string;
  status: string;
  category: string;
  valueData: string | number | (string | number)[];
  effectiveDateTime: Dayjs | string | null;
}

export function createObservationTableColumns(): ColumnDef<ObservationTableData>[] {
  return [
    {
      accessorKey: "observation",
      header: "Observation",
      cell: ({ row }) => (
        <div className="flex max-w-64">
          <div className="font-medium">
            {row.getValue("observation") ?? "-"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="flex max-w-64">
          <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-sm">
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.getValue("category") ?? "-",
    },
    {
      accessorKey: "valueData",
      header: "Value(s)",
      cell: ({ row }) => {
        const valueData = row.getValue("valueData") as
          | string
          | number
          | (string | number)[];

        if (Array.isArray(valueData)) {
          return (
            <div className="flex flex-col gap-5">
              {valueData.map((value) => {
                if (typeof value === "string") {
                  return (
                    <div key={value}>
                      {value.includes(": ") ? (
                        <div className="min-w-40">
                          <div className="font-medium">
                            {value.split(": ")[0] ?? ""}
                          </div>
                          <div className="text-muted-foreground">
                            {value.split(": ")[1] ?? ""}
                          </div>
                        </div>
                      ) : (
                        <div key={value} className="text-muted-foreground">
                          {value ?? "-"}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={value} className="text-muted-foreground">
                    {value ?? "-"}
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <div key={valueData} className="text-muted-foreground">
            {valueData ?? "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "effectiveDateTime",
      header: "Effective Date Time",
      sortingFn: (a, b) => {
        if (
          a.original.effectiveDateTime === null ||
          b.original.effectiveDateTime === null ||
          typeof a.original.effectiveDateTime === "string" ||
          typeof b.original.effectiveDateTime === "string"
        ) {
          return 0;
        }

        return a.original.effectiveDateTime.diff(b.original.effectiveDateTime);
      },
      cell: ({ row }) => {
        if (typeof row.original.effectiveDateTime === "string") {
          return row.original.effectiveDateTime;
        }

        return row.original.effectiveDateTime
          ? row.original.effectiveDateTime.format("DD/MM/YYYY")
          : "-";
      },
    },
  ];
}

export function getObservationValueData(observation: Observation) {
  const observationValue = getObservationOrComponentValue(observation);
  if (observationValue !== null) {
    return observationValue;
  }

  if (observation.component) {
    return observation.component
      .map((component) => {
        // Get value
        const componentValue = getObservationOrComponentValue(component);
        if (componentValue === null) {
          return null;
        }

        // Append code display to value if it exists
        if (component.code) {
          const componentDisplay =
            component.code?.coding?.[0].display ?? component.code?.text ?? "";
          return componentDisplay + ": " + componentValue;
        }

        // Otherwise, return value only
        return componentValue;
      })
      .filter((value): value is string | number => value !== null);
  }

  return "";
}

export function getObservationOrComponentValue(
  item: Observation | ObservationComponent
) {
  if (item.valueQuantity) {
    let valueQuantityText = item.valueQuantity.value ?? "";
    if (item.valueQuantity.comparator) {
      valueQuantityText =
        item.valueQuantity.comparator + " " + valueQuantityText;
    }

    // Add unit if it exists
    if (item.valueQuantity.unit) {
      valueQuantityText = valueQuantityText + " " + item.valueQuantity.unit;
    }

    // If valueQuantityText is available at this point, return it
    if (valueQuantityText) {
      return valueQuantityText;
    }

    const dataAbsentReason = item.valueQuantity.extension?.find(
      (ext) =>
        ext.url === "http://hl7.org/fhir/StructureDefinition/data-absent-reason"
    )?.valueCode;
    if (dataAbsentReason) {
      return "*" + dataAbsentReason;
    }

    return "*";
  }

  if (item.valueCodeableConcept) {
    const valueText =
      item.valueCodeableConcept.coding?.[0].display ??
      item.valueCodeableConcept.text ??
      item.valueCodeableConcept.coding?.[0].code ??
      "";

    if (
      item.valueCodeableConcept.coding?.[0].system ===
      "http://terminology.hl7.org/CodeSystem/data-absent-reason"
    ) {
      return "*" + valueText.toLowerCase();
    }

    return valueText;
  }

  if (item.valueRange) {
    let valueRangeLowText = item.valueRange.low?.value ?? "*";
    if (item.valueRange.low?.unit) {
      valueRangeLowText += " " + item.valueRange.low.unit;
    }

    let valueRangeHighText = item.valueRange.high?.value ?? "*";
    if (item.valueRange.high?.unit) {
      valueRangeHighText += " " + item.valueRange.high.unit;
    }

    return `${valueRangeLowText} - ${valueRangeHighText}`;
  }

  if (item.valueString) {
    return item.valueString;
  }

  if (item.dataAbsentReason) {
    const dataAbsentReason =
      item.dataAbsentReason.coding?.[0].code ??
      item.dataAbsentReason.text ??
      "";
    return "*" + dataAbsentReason;
  }

  return null;
}
