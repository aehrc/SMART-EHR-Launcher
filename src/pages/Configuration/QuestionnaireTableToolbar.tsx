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

import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useLauncherQuery from "../../hooks/useLauncherQuery.ts";
import { QuestionnaireListItem } from "./QuestionnaireTable.tsx";
import { enqueueSnackbar } from "notistack";
import { grey } from "@mui/material/colors";

interface Props {
  selected: QuestionnaireListItem | null;
  removeSelected: () => void;
}

function QuestionnaireTableToolbar(props: Props) {
  const { selected, removeSelected } = props;

  const { setQuery, launch } = useLauncherQuery();
  let questionnaireContext = undefined;
  if (launch.fhir_context) {
    try {
      const parsedFhirContext = JSON.parse(launch.fhir_context);
      questionnaireContext = parsedFhirContext["Questionnaire"];
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box
      sx={{
        height: 85,
        display: "flex",
        justifyContent: "space-between",
        gap: 5,
        color: "primary.main",
        alignItems: "center",
        px: 4,
        bgcolor: selected ? "#d1e9fc" : "#fff",
      }}
    >
      {selected ? (
        <>
          <Typography variant="subtitle1" fontWeight="bold">
            {selected.title} selected
          </Typography>
          <Button
            onClick={() => {
              setQuery({ fhir_context: `{"Questionnaire":"${selected.id}"}` });
              enqueueSnackbar(`Questionnaire context set. ID:${selected.id} `, {
                variant: "success",
                autoHideDuration: 3000,
              });
              removeSelected();
            }}
            endIcon={<ArrowForwardIcon />}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Set questionnaire context
            </Typography>
          </Button>
        </>
      ) : questionnaireContext ? (
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize={15}
          color={grey.A700}
        >
          {`Questionnaire context set as ${questionnaireContext}`}
        </Typography>
      ) : (
        <Typography variant="subtitle1" fontWeight="bold" color={grey.A700}>
          Questionnaire context not set
        </Typography>
      )}
    </Box>
  );
}

export default QuestionnaireTableToolbar;
