import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

const themeOptions: ThemeOptions = {
  palette: {
    background: { default: grey[100] },
  },
  typography: {
    fontFamily: "'Public Sans','Montserrat', sans-serif",
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
          color: "inherit",
          boxShadow: "none",
          padding: "0.6rem 1.5rem",
        },
        outlinedPrimary: {
          borderColor: "primary.main",
          color: "primary.main",
        },
        containedPrimary: {
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #E5EAF2",
          borderRadius: 10,
        },
      },
    },
  },
};

export const theme = () => {
  const theme: Theme = createTheme(themeOptions);

  // theme shadows
  theme.shadows[1] = "0px 4px 23px rgba(0, 0, 0, 0.12)";
  theme.shadows[2] = "0px 0px 21px 1px rgba(0, 0, 0, 0.07)";
  theme.shadows[3] = "0px 10px 30px rgba(0, 0, 0, 0.1)";
  theme.shadows[4] = "0px 7px 30px 3px rgba(0, 0, 0, 0.05)";

  return theme;
};
