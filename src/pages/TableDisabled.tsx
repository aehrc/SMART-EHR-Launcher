/*
 * Copyright 2023 Commonwealth Scientific and Industrial Research
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

import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

interface Props {
  resourceName: string;
}
function TableDisabled(props: Props) {
  const { resourceName } = props;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={6} sx={{ py: 10.5 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "text.disabled" }}
          >
            {`Connected SMART Auth Server doesn't support ${resourceName} context`}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
export default TableDisabled;
