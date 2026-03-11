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

import DataTable from "@/components/DataTable.tsx";
import { PractitionerRoleContext } from "@/contexts/PractitionerRoleContext";
import useFetchPractitionerRoles from "@/hooks/useFetchPractitionerRoles";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import {
  createPractitionerRoleTableColumns,
  PractitionerRoleTableData,
} from "@/utils/dataTable.tsx";
import {
  addOrUpdateFhirContext,
  fhirContextIsPractitionerRoleContext,
  parseFhirContext,
  removeFhirContext,
  serializeFhirContext,
} from "@/utils/fhirContext.ts";
import { Practitioner } from "fhir/r4";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { useContext, useMemo } from "react";

interface PractitionerRoleTableProps {
  selectedUser: Practitioner | null;
}

function PractitionerRoleTable({ selectedUser }: PractitionerRoleTableProps) {
  const { selectedPractitionerRole, setSelectedPractitionerRole } = useContext(
    PractitionerRoleContext,
  );
  const { launch, setQuery } = useLauncherQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { practitionerRoles, isInitialLoading } = useFetchPractitionerRoles(
    selectedUser?.id,
  );

  const practitionerRoleTableData: PractitionerRoleTableData[] = useMemo(() => {
    return practitionerRoles.map((practitionerRole) => ({
      id: practitionerRole.id ?? nanoid(),
      practitionerRef: practitionerRole.practitioner?.reference ?? "",
      resourceType: practitionerRole.resourceType,
    }));
  }, [practitionerRoles]);

  const columns = createPractitionerRoleTableColumns(
    selectedPractitionerRole,
    selectedUser,
    handleSetPractitionerRoleContext,
  );

  function handleSetPractitionerRoleContext(id: string) {
    const newPractitionerRole = practitionerRoles.find(
      (practitionerRole) => practitionerRole.id === id,
    );
    // Get current FHIR contexts as an array
    const currentFhirContexts = parseFhirContext(launch.fhir_context);
    // Remove selected PractitionerRole contexts from the array
    let updatedContexts = removeFhirContext(
      currentFhirContexts,
      fhirContextIsPractitionerRoleContext,
    );
    // PractitionerRole not found OR PractitionerRole is already selected, unset PractitionerRole and context
    if (
      !newPractitionerRole ||
      selectedPractitionerRole?.id === newPractitionerRole.id
    ) {
      setSelectedPractitionerRole(null);
      setQuery({
        fhir_context: serializeFhirContext(updatedContexts),
      });
      return;
    }

    // Set selected practitionerRole and add/update practitionerRole context in the array
    const practitionerRoleFhirContext = {
      reference: `PractitionerRole/${newPractitionerRole.id}`,
    };
    // Add the practitionerrole context in the array
    updatedContexts = addOrUpdateFhirContext(
      updatedContexts,
      practitionerRoleFhirContext,
    );
    setSelectedPractitionerRole(newPractitionerRole);
    setQuery({
      fhir_context: serializeFhirContext(updatedContexts),
    });
    enqueueSnackbar(
      `PractitionerRole context set. ID: ${newPractitionerRole.id}`,
      {
        variant: "success",
        autoHideDuration: 3000,
      },
    );
  }

  return (
    <DataTable
      data={practitionerRoleTableData}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedPractitionerRole}
      onClearSelectedData={() => {
        setSelectedPractitionerRole(null);
        const currentFhirContexts = parseFhirContext(launch.fhir_context);
        const updatedContexts = removeFhirContext(
          currentFhirContexts,
          fhirContextIsPractitionerRoleContext,
        );
        setQuery({
          fhir_context: serializeFhirContext(updatedContexts),
        });
      }}
    />
  );
}

export default PractitionerRoleTable;
