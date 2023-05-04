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
import { Bundle, MedicationRequest } from "fhir/r4";
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
  { id: "medication", label: "Medication" },
  { id: "status", label: "Status" },
  { id: "authored-on", label: "Authored On" },
];

function PatientMedications(props: Props) {
  const { patientId } = props;

  const { token } = useContext(TokenContext);

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<MedicationRequest>>(
    ["medications"],
    () =>
      axios(
        getFhirServerBaseUrl() + `/MedicationRequest?patient=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...QUERY_HEADERS,
          },
        }
      ).then((res) => res.data),
    { enabled: !!token }
  );

  const medicationRequests: MedicationRequest[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const medicationListItems: MedicationListItem[] = useMemo(
    () => getAllergyListItems(medicationRequests),
    [medicationRequests]
  );

  const isEmpty = medicationListItems.length === 0;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Medications
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
              {medicationListItems.map((row) => {
                const { id, name, status, authoredOn } = row;

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
                    <TableCell sx={{ pl: 0 }}>{authoredOn}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {isEmpty || error || isLoading ? (
              <TableFeedback
                isEmpty={isEmpty}
                loading={isLoading}
                error={error}
                resourceNamePlural={"medications"}
              />
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Helper interfaces and functions
export interface MedicationListItem {
  id: string;
  name: string;
  status: string;
  authoredOn: string;
  authoredOnMoment: Moment | null;
}

function getAllergyListItems(
  medications: MedicationRequest[]
): MedicationListItem[] {
  if (!medications || medications.length === 0) return [];

  return medications
    .map((entry, i) => {
      let authoredOnMoment = null;
      if (entry.authoredOn) {
        authoredOnMoment = moment(entry.authoredOn);
      }

      return {
        id: entry.id ?? i.toString(),
        name: entry.medicationCodeableConcept?.text ?? "unknown",
        status: entry.status ?? "unknown",
        authoredOn: authoredOnMoment
          ? authoredOnMoment.format("DD/MM/YYYY")
          : "unknown",
        authoredOnMoment: authoredOnMoment,
      };
    })
    .sort((a, b) => {
      if (a.authoredOnMoment === null || b.authoredOnMoment === null) {
        return 0;
      }

      return b.authoredOnMoment.diff(a.authoredOnMoment);
    });
}

export default PatientMedications;
