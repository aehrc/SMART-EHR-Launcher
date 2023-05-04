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
import { Bundle, Immunization } from "fhir/r4";
import moment, { Moment } from "moment";
import TableFeedback from "../../TableFeedback.tsx";
import { TokenContext } from "../../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getFhirServerBaseUrl, QUERY_HEADERS } from "../../../lib/utils.ts";

interface Props {
  patientId: string;
}

const tableHeaders = [
  { id: "immunisation", label: "Immunisation" },
  { id: "status", label: "Status" },
  { id: "occurrence-date", label: "Occurrence Date" },
];

function PatientImmunizations(props: Props) {
  const { patientId } = props;

  const { token } = useContext(TokenContext);

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<Immunization>>(
    ["immunizations"],
    () =>
      axios(getFhirServerBaseUrl() + `/Immunization?patient=${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...QUERY_HEADERS,
        },
      }).then((res) => res.data),
    { enabled: !!token }
  );

  const immunizations: Immunization[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const immunizationListItems: ImmunizationListItem[] = useMemo(
    () => getImmunizationListItems(immunizations),
    [immunizations]
  );

  const isEmpty = immunizationListItems.length === 0;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Immunizations
      </Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />

      <Card>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table>
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow sx={{ height: 56 }}>
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
              {immunizationListItems.map((row) => {
                const { id, vaccine, status, occurrenceDate } = row;

                return (
                  <TableRow key={id} tabIndex={-1}>
                    <TableCell scope="row" sx={{ pl: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "Capitalize" }}
                      >
                        {vaccine}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ pl: 0, textTransform: "capitalize" }}>
                      {status}
                    </TableCell>
                    <TableCell sx={{ pl: 0 }}>{occurrenceDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isEmpty || error || isLoading ? (
              <TableFeedback
                isEmpty={isEmpty}
                loading={isLoading}
                error={error}
                resourceNamePlural={"immunisations"}
              />
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Helper interfaces and functions
export interface ImmunizationListItem {
  id: string;
  vaccine: string;
  status: string;
  occurrenceDate: string;
  occurrenceDateMoment: Moment | null;
}

function getImmunizationListItems(
  immunizations: Immunization[]
): ImmunizationListItem[] {
  if (!immunizations || immunizations.length === 0) return [];

  return immunizations
    .map((entry, i) => {
      let occurrenceDateMoment = null;
      if (entry.occurrenceDateTime) {
        occurrenceDateMoment = moment(entry.occurrenceDateTime);
      }

      return {
        id: entry.id ?? i.toString(),
        vaccine: entry.vaccineCode?.text ?? "unknown",
        status: entry.status,
        occurrenceDate: occurrenceDateMoment
          ? occurrenceDateMoment.format("DD/MM/YYYY")
          : "unknown",
        occurrenceDateMoment: occurrenceDateMoment,
      };
    })
    .sort((a, b) => {
      if (a.occurrenceDateMoment === null || b.occurrenceDateMoment === null) {
        return 0;
      }

      return b.occurrenceDateMoment.diff(a.occurrenceDateMoment);
    });
}

export default PatientImmunizations;
