import { Box, styled } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar.tsx";
import DashboardSidebar from "./DashboardSideBar.tsx";

// styled components
const Wrapper = styled(Box)({
  width: `calc(100% - 80px)`,
  maxWidth: 1200,
  margin: "auto",
  paddingLeft: 80,
});

interface Props {
  children?: ReactNode;
}

function DashboardLayout(props: Props) {
  const { children } = props;

  return (
    <>
      <DashboardSidebar />

      <Wrapper>
        <DashboardNavbar />
        <Box pt={2} pb={4}>
          {children || <Outlet />}
        </Box>
      </Wrapper>
    </>
  );
}

export default DashboardLayout;
