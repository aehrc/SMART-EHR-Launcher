import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import UserNavProfile from "./NavProfiles/UserNavProfile.tsx";
import { TitleContext } from "../contexts/TitleContext.tsx";
import PatientNavProfile from "./NavProfiles/PatientNavProfile.tsx";

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
  height: 45,
}));

// fix the styling on these

// root component
function DashboardNavbar() {
  const { title } = useContext(TitleContext);

  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          {title}
        </Typography>

        <Box flexGrow={1} />
        <PatientNavProfile />
        <Box sx={{ mr: 5 }} />
        <UserNavProfile />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
}

export default DashboardNavbar;
