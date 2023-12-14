import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableFeedback from "../TableFeedback.tsx";
import { EncounterListItem } from "./EncounterTable.tsx";
import EncounterTableToolbar from "./EncounterTableToolbar.tsx";

const tableHeaders = [
  { id: "id", label: "Encounter ID" },
  { id: "patientRef", label: "Patient Ref ID" },
];

interface EncounterTableViewProps {
  selectedItem: EncounterListItem | null;
  encountersIsLoading: boolean;
  encountersIsEmpty: boolean;
  fetchError: unknown;
  encounterListItems: EncounterListItem[];
  onSelectItem: (item: EncounterListItem | null) => void;
  onRowClick: (id: string) => void;
}

function EncounterTableView(props: EncounterTableViewProps) {
  const {
    selectedItem,
    encountersIsLoading,
    encountersIsEmpty,
    fetchError,
    encounterListItems,
    onSelectItem,
    onRowClick,
  } = props;

  return (
    <Card>
      <EncounterTableToolbar
        selected={selectedItem}
        removeSelected={() => onSelectItem(null)}
      />

      <TableContainer sx={{ minWidth: 400 }}>
        <Table>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              {tableHeaders.map((headCell, index) => (
                <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                  {encountersIsLoading ? null : headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {encounterListItems.map((row) => {
              const { id, patientRef } = row;
              const isSelected = selectedItem?.id === id;

              return (
                <TableRow
                  hover
                  key={id}
                  tabIndex={-1}
                  selected={isSelected}
                  onClick={() => onRowClick(row.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell scope="row" sx={{ pl: 4 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {id}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ pl: 0 }}>{patientRef}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {encountersIsEmpty || fetchError || encountersIsLoading ? (
            <TableFeedback
              isEmpty={encountersIsEmpty}
              loading={encountersIsLoading}
              error={fetchError}
              resourceNamePlural={"encounters"}
            />
          ) : null}
        </Table>
      </TableContainer>
    </Card>
  );
}

export default EncounterTableView;
