import { useContext, useMemo } from "react";
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Bundle, Condition } from "fhir/r4";
import moment, { Moment } from "moment";
import TableFeedback from "../../TableFeedback.tsx";
import { TokenContext } from "../../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { getFhirServerBaseUrl } from "../../../utils/misc.ts";
import { fetchResourceFromEHR } from "../../../api/fhirApi.ts";
import useSourceFhirServer from "../../../hooks/useSourceFhirServer.ts";

interface Props {
  patientId: string;
}

const tableHeaders = [
  { id: "condition", label: "Condition" },
  { id: "clinical-status", label: "Clinical Status" },
  { id: "onset-date", label: "Onset Date" },
  { id: "recorded-date", label: "Recorded Date" },
];

function PatientConditions(props: Props) {
  const { patientId } = props;

  const { token } = useContext(TokenContext);

  const { serverUrl } = useSourceFhirServer();

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Condition>>(
    ["conditions", serverUrl, patientId],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + `/Condition?patient=${patientId}`,
        serverUrl,
        token ?? ""
      ),
    { enabled: token !== null }
  );

  const conditions: Condition[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const conditionListItems: ConditionListItem[] = useMemo(
    () => getConditionListItems(conditions),
    [conditions]
  );

  const isEmpty = conditionListItems.length === 0;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Conditions
      </Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />

      <Card>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow sx={{ height: 42 }}>
                {tableHeaders.map((headCell, index) => (
                  <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {isLoading || isEmpty ? null : headCell.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {conditionListItems.map((row) => {
                const { id, name, status, onsetDate, recordedDate } = row;

                return (
                  <TableRow key={id} tabIndex={-1}>
                    <TableCell scope="row" sx={{ pl: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "Capitalize" }}
                      >
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ pl: 0, textTransform: "capitalize" }}>
                      {status}
                    </TableCell>
                    <TableCell sx={{ pl: 0 }}>{onsetDate}</TableCell>
                    <TableCell sx={{ pl: 0 }}>{recordedDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isEmpty || error || isLoading ? (
              <TableFeedback
                isEmpty={isEmpty}
                loading={isLoading}
                error={error}
                resourceNamePlural={"conditions"}
              />
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Helper interfaces and functions
export interface ConditionListItem {
  id: string;
  name: string;
  status: string;
  onsetDate: string;
  recordedDate: string;
  recordedDateMoment: Moment | null;
}

function getConditionListItems(conditions: Condition[]): ConditionListItem[] {
  if (!conditions || conditions.length === 0) return [];

  return conditions
    .map((entry, i) => {
      let status = "unknown";
      if (
        entry.clinicalStatus?.coding &&
        entry.clinicalStatus.coding.length > 0
      ) {
        status = entry.clinicalStatus.coding[0].display ?? "unknown";
      }

      let recordedDateMoment = null;
      if (entry.recordedDate) {
        recordedDateMoment = moment(entry.recordedDate);
      }

      return {
        id: entry.id ?? i.toString(),
        name: entry.code?.text ?? entry.code?.coding?.[0].display ?? "unknown",
        status: status,
        onsetDate: entry.onsetDateTime
          ? moment(entry.onsetDateTime).format("DD/MM/YYYY")
          : "unknown",
        recordedDate: recordedDateMoment
          ? recordedDateMoment.format("DD/MM/YYYY")
          : "unknown",
        recordedDateMoment: recordedDateMoment,
      };
    })
    .sort((a, b) => {
      if (a.recordedDateMoment === null || b.recordedDateMoment === null) {
        return 0;
      }

      return b.recordedDateMoment.diff(a.recordedDateMoment);
    });
}

export default PatientConditions;
