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

import { useContext, useMemo } from "react";
import {
  createUserTableColumns,
  QuestionnaireTableData,
} from "@/utils/dataTable.tsx";
import DataTable from "@/components/DataTable.tsx";
import useLauncherQuery from "@/hooks/useLauncherQuery.ts";
import { useSnackbar } from "notistack";
import { UserContext } from "@/contexts/UserContext.tsx";
import useFetchPractitioners from "@/hooks/useFetchPractitioners.ts";
import { humanName } from "@/utils/misc.ts";
import { nanoid } from "nanoid";

function UserTable() {
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const { setQuery } = useLauncherQuery();

  const { enqueueSnackbar } = useSnackbar();

  const { practitioners, isInitialLoading } = useFetchPractitioners();

  const userTableData: QuestionnaireTableData[] = useMemo(() => {
    return practitioners.map((practitioner) => ({
      id: practitioner.id ?? nanoid(),
      name: practitioner.name ? humanName(practitioner) : "Untitled",
      resourceType: practitioner.resourceType,
    }));
  }, [practitioners]);

  const columns = createUserTableColumns(selectedUser, handleSetUserContext);

  function handleSetUserContext(id: string) {
    const newUser = practitioners.find(
      (practitioner) => practitioner.id === id
    );

    // User not found OR user is already selected, unset user and context
    if (!newUser || selectedUser?.id === newUser.id) {
      setSelectedUser(null);
      setQuery({
        provider: undefined,
      });
      return;
    }

    // Set selected user and set query
    setSelectedUser(newUser);
    setQuery({
      provider: newUser.id,
    });
    enqueueSnackbar(`User set to ${humanName(newUser)} `, {
      variant: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <DataTable
      data={userTableData}
      columns={columns}
      isLoading={isInitialLoading}
      selectedData={selectedUser}
    />
  );
}

export default UserTable;
