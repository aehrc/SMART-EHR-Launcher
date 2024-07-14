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
import { AllergyIntolerance, Bundle } from "fhir/r4";
import moment, { Moment } from "moment";
import TableFeedback from "../../TableFeedback.tsx";
import { TokenContext } from "../../../contexts/TokenContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { getFhirServerBaseUrl } from "../../../lib/utils.ts";
import { fetchResourceFromEHR } from "../../../api/fhirApi.ts";
import useSourceFhirServer from "../../../hooks/useSourceFhirServer.ts";

const tableHeaders = [
  { id: "allergy", label: "Allergy" },
  { id: "category", label: "Category" },
  { id: "criticality", label: "Criticality" },
  { id: "recorded-date", label: "Recorded Date" },
];

interface Props {
  patientId: string;
}

function PatientAllergies(props: Props) {
  const { patientId } = props;

  const { token } = useContext(TokenContext);

  const { serverUrl } = useSourceFhirServer();

  const {
    data: bundle,
    error,
    isLoading,
  } = useQuery<Bundle<AllergyIntolerance>>(
    ["allergies", serverUrl, patientId],
    () =>
      fetchResourceFromEHR(
        getFhirServerBaseUrl() + `/AllergyIntolerance?patient=${patientId}`,
        serverUrl,
        token ?? ""
      ),
    { enabled: token !== null }
  );

  const allergies: AllergyIntolerance[] = useMemo(
    () => bundle?.entry?.map((p) => p.resource!) || [],
    [bundle]
  );

  // construct questionnaire list items for data display
  const allergyListItems: AllergyListItem[] = useMemo(
    () => getAllergyListItems(allergies),
    [allergies]
  );

  const isEmpty = allergyListItems.length === 0;

  return (
    <>
      <Typography fontSize={18} fontWeight="bold">
        Allergies
      </Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Card>
        <TableContainer sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow sx={{ height: 42 }}>
                {tableHeaders.map((headCell, index) => (
                  <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                    <Typography variant="subtitle2">
                      {isLoading || isEmpty ? null : headCell.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allergyListItems.map((row) => {
                const { id, name, category, criticality, recordedDate } = row;

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
                      {category}
                    </TableCell>
                    <TableCell sx={{ pl: 0 }}>{criticality}</TableCell>
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
                resourceNamePlural={"allergies"}
              />
            ) : null}
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Helper interfaces and functions
export interface AllergyListItem {
  id: string;
  name: string;
  category: string;
  criticality: string;
  recordedDate: string;
  recordedDateMoment: Moment | null;
}

function getAllergyListItems(
  allergies: AllergyIntolerance[]
): AllergyListItem[] {
  if (!allergies || allergies.length === 0) return [];

  return allergies
    .map((entry, i) => {
      let category = "unknown";
      if (entry.category && entry.category.length > 0) {
        category = entry.category[0];
      }

      let recordedDateMoment = null;
      if (entry.recordedDate) {
        recordedDateMoment = moment(entry.recordedDate);
      }

      return {
        id: entry.id ?? i.toString(),
        name: entry.code?.text ?? entry.code?.coding?.[0].display ?? "unknown",
        category: category,
        criticality: entry.criticality ?? "unknown",
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

export default PatientAllergies;
