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

import {
  LinearProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

interface Props {
  isEmpty: boolean;
  loading: boolean;
  error?: unknown;
  resourceNamePlural: string;
}
function TableFeedback(props: Props) {
  const { isEmpty, loading, error, resourceNamePlural } = props;

  let feedbackType: FeedbackProps["feedbackType"] | null = null;
  if (error) {
    feedbackType = "error";
  } else if (loading) {
    feedbackType = "loading";
  } else if (isEmpty) {
    feedbackType = "empty";
  }

  return feedbackType ? (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={6} sx={{ py: 5 }}>
          <RenderFeedback
            feedbackType={feedbackType}
            error={error}
            resourceNamePlural={resourceNamePlural}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  ) : null;
}

interface FeedbackProps {
  feedbackType: "error" | "empty" | "loading";
  error?: unknown;
  resourceNamePlural: string;
}

function RenderFeedback(props: FeedbackProps) {
  const { feedbackType, error, resourceNamePlural } = props;

  switch (feedbackType) {
    case "loading":
      return (
        <>
          <Typography>{`Loading ${resourceNamePlural}`}</Typography>

          <LinearProgress sx={{ m: 5 }} />
        </>
      );
    case "error":
      console.error(error);
      return (
        <>
          <Typography>
            Oops, an error occurred. Check console for error messages.
          </Typography>
        </>
      );
    case "empty":
      return (
        <>
          <Typography>{`No ${resourceNamePlural} found`}</Typography>
        </>
      );
  }
}
export default TableFeedback;
