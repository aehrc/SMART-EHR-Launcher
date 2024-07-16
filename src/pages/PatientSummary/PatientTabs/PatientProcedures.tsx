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
import { Bundle, Procedure } from "fhir/r4";
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
  { id: "procedure", label: "Procedure" },
  { id: "status", label: "Status" },
  { id: "reason", label: "Reason" },
  { id: "performed-on", label: "Performed On" },
];

function PatientProcedures(props: Props) {
  const { patientId } = props;

  const { token } = useContext(TokenContext);

  const { serverUrl } = useSourceFhirServer();

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Procedure>>(
    ["procedures", serverUrl, patientId],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + `/Procedure?patient=${patientId}`,
        serverUrl,
        token ?? ""
      ),
    { enabled: token !== null }
  );

  const procedures: Procedure[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const procedureListItems: ProcedureListItem[] = useMemo(
    () => getProcedureListItems(procedures),
    [procedures]
  );
  const isEmpty = procedureListItems.length === 0;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Procedures
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
              {procedureListItems.map((row) => {
                const { id, name, status, reason, performedOn } = row;

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
                    <TableCell sx={{ pl: 0 }}>{reason}</TableCell>
                    <TableCell sx={{ pl: 0 }}>{performedOn}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isEmpty || error || isLoading ? (
              <TableFeedback
                isEmpty={isEmpty}
                loading={isLoading}
                error={error}
                resourceNamePlural={"procedures"}
              />
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Helper interfaces and functions
export interface ProcedureListItem {
  id: string;
  name: string;
  status: string;
  reason: string;
  performedOn: string;
  performedOnMoment: Moment | null;
}

function getProcedureListItems(procedures: Procedure[]): ProcedureListItem[] {
  if (!procedures || procedures.length === 0) return [];

  return procedures
    .map((entry, i) => {
      let performedOnMoment: moment.Moment | null = null;
      if (entry.performedPeriod?.start) {
        performedOnMoment = moment(entry.performedPeriod?.start);
      }

      return {
        id: entry.id ?? i.toString(),
        name: entry.code?.text ?? entry.code?.coding?.[0].display ?? "unknown",
        status: entry.status,
        reason: entry.reasonReference?.[0].display ?? "unknown",
        performedOn: performedOnMoment
          ? performedOnMoment.format("DD/MM/YYYY HH:mm")
          : "unknown",
        performedOnMoment: performedOnMoment,
      };
    })
    .sort((a, b) => {
      if (a.performedOnMoment === null || b.performedOnMoment === null) {
        return 0;
      }

      return b.performedOnMoment.diff(a.performedOnMoment);
    });
}

export default PatientProcedures;
