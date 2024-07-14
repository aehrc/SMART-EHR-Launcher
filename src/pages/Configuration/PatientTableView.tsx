import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TableFeedback from "../TableFeedback.tsx";
import { PatientListItem } from "./PatientTable.tsx";
import PatientTableToolbar from "./PatientTableToolbar.tsx";

const tableHeaders = [
  { id: "name", label: "Name" },
  { id: "gender", label: "Gender" },
  { id: "age", label: "Age" },
  { id: "dob", label: "Date of Birth" },
];

interface PatientTableViewProps {
  selectedItem: PatientListItem | null;
  patientsIsLoading: boolean;
  patientsIsEmpty: boolean;
  fetchError: unknown;
  patientListItems: PatientListItem[];
  page: number;
  rowsPerPage: number;
  emptyRows: number;
  onSelectItem: (item: PatientListItem | null) => void;
  onRowClick: (id: string) => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

function PatientTableView(props: PatientTableViewProps) {
  const {
    selectedItem,
    patientsIsLoading,
    patientsIsEmpty,
    fetchError,
    patientListItems,
    page,
    rowsPerPage,
    emptyRows,
    onSelectItem,
    onRowClick,
    onPageChange,
    onRowsPerPageChange,
  } = props;

  return (
    <Card>
      <PatientTableToolbar
        selected={selectedItem}
        removeSelected={() => onSelectItem(null)}
      />

      <TableContainer sx={{ minWidth: 400 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              {tableHeaders.map((headCell, index) => (
                <TableCell key={headCell.id} sx={{ pl: index === 0 ? 4 : 0 }}>
                  {patientsIsLoading ? null : headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patientListItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const { id, name, dob, age, gender } = row;
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
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ textTransform: "Capitalize" }}
                      >
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ pl: 0, textTransform: "Capitalize" }}>
                      {gender}
                    </TableCell>
                    <TableCell sx={{ pl: 0, textTransform: "Capitalize" }}>
                      {age}
                    </TableCell>
                    <TableCell sx={{ pl: 0, textTransform: "Capitalize" }}>
                      {dob}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {patientsIsEmpty || fetchError || patientsIsLoading ? (
            <TableFeedback
              isEmpty={patientsIsEmpty}
              loading={patientsIsLoading}
              error={fetchError}
              resourceNamePlural={"patients"}
            />
          ) : null}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patientListItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) => {
          onRowsPerPageChange(parseInt(event.target.value));
          onPageChange(0);
        }}
      />
    </Card>
  );
}

export default PatientTableView;
