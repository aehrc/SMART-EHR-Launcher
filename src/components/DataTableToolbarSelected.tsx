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

import { FhirResource } from "fhir/r4";
import { getSelectedDataIDColorClass } from "@/utils/dataTable.tsx";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface DataTableToolbarSelectedProps {
  selectedData: FhirResource | null;
  onClearSelectedData?: () => void;
}

function DataTableToolbarSelected(props: DataTableToolbarSelectedProps) {
  const { selectedData, onClearSelectedData } = props;

  if (!selectedData || !selectedData.id) {
    return (
      <div className="text-sm text-muted-foreground">No item selected</div>
    );
  }

  const resourceType = selectedData.resourceType ?? null;

  return (
    <div className="flex gap-x-0.5 items-center">
      <div className="text-sm text-muted-foreground">
        Selected ID:{" "}
        <span
          className={`px-2 py-0.5 rounded ${getSelectedDataIDColorClass(
            resourceType
          )}`}
        >
          {selectedData.id}
        </span>
      </div>
      {onClearSelectedData ? (
        <Button
          title="Clear"
          variant="ghost"
          className="flex h-7 w-7 p-0 m-0 text-muted-foreground"
          onClick={onClearSelectedData}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      ) : null}
    </div>
  );
}

export default DataTableToolbarSelected;
