import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const NotImplementedText = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "30px",
  alignItems: "center",
  padding: "0 8px",
  borderRadius: 1,
  textTransform: "uppercase",
  color: grey["700"],
  background: grey["200"],
  fontSize: "11px",
  fontWeight: theme.typography.fontWeightBold,
}));
