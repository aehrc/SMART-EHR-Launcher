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

import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useLauncherQuery from "../../../hooks/useLauncherQuery.ts";
import { QuestionnaireListItem } from "./QuestionnaireTable.tsx";
import { enqueueSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { QuestionnaireContext } from "../../../contexts/QuestionnaireContext.tsx";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  selected: QuestionnaireListItem | null;
  removeSelected: () => void;
}

function QuestionnaireTableToolbar(props: Props) {
  const { selected, removeSelected } = props;

  const { setQuery } = useLauncherQuery();

  const { questionnaireId, setQuestionnaireId } =
    useContext(QuestionnaireContext);

  return (
    <Box
      sx={{
        height: 64,
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
              const canonical = selected?.url
                ? `${selected?.url}|${selected?.version}`
                : "";

              if (canonical) {
                const questionnaireFhirContext = {
                  role: "questionnaire-render-on-launch",
                  canonical: canonical,
                  type: "Questionnaire",
                };

                setQuestionnaireId(selected.id);
                setQuery({
                  fhir_context: `${JSON.stringify(questionnaireFhirContext)}`,
                });
                enqueueSnackbar(
                  `Questionnaire context set. ID:${selected.id} `,
                  {
                    variant: "success",
                    autoHideDuration: 3000,
                  }
                );
              } else {
                enqueueSnackbar(`Questionnaire ${selected.id} lacks a url`, {
                  variant: "warning",
                  autoHideDuration: 3000,
                });
              }
              removeSelected();
            }}
            endIcon={<ArrowForwardIcon />}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Set questionnaire context
            </Typography>
          </Button>
        </>
      ) : questionnaireId ? (
        <>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            fontSize={15}
            color={grey.A700}
          >
            {`Questionnaire context set as ${questionnaireId}`}
          </Typography>
          <Tooltip title="Remove questionnaire context">
            <IconButton
              onClick={() => {
                setQuestionnaireId("");
                setQuery({
                  fhir_context: "",
                });
                enqueueSnackbar("Questionnaire context removed", {
                  autoHideDuration: 3000,
                });
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography variant="subtitle1" fontWeight="bold" color={grey.A700}>
          Questionnaire context not set
        </Typography>
      )}
    </Box>
  );
}

export default QuestionnaireTableToolbar;
