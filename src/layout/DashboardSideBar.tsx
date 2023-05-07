import { Box, List, ListItemButton, styled, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import { ArticleOutlined, SettingsOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";

// custom styled components
const MainMenu = styled(Box)(({ theme }) => ({
  left: 0,
  width: 80,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  position: "fixed",
  boxShadow: theme.shadows[2],
  transition: "left 0.3s ease",
  zIndex: theme.zIndex.drawer + 11,
  backgroundColor: theme.palette.background.paper,
  "& .simplebar-track.simplebar-vertical": { width: 7 },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary,
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));

interface MenuItem {
  title: string;
  Icon: any;
  path: string;
}

const topMenuList: MenuItem[] = [
  {
    title: "Patient Summary",
    Icon: ArticleOutlined,
    path: "/",
  },
];

function getRouteTitle(pathName: string): string {
  if (pathName === "/configuration") {
    return "Configuration";
  }

  const menuItem = topMenuList.find((item) => item.path === pathName);
  if (menuItem) {
    return menuItem.title;
  }

  return "";
}

// root component
function DashboardSideBar() {
  const navigate = useNavigate();

  const [active, setActive] = useState(getRouteTitle(window.location.pathname));
  const { closeSnackbar } = useSnackbar();

  const handleActiveMainMenu = (menuItem: MenuItem) => () => {
    setActive(menuItem.title);
    closeSnackbar();
    navigate(menuItem.path + window.location.search);
  };

  const configurationButton = (
    <List>
      <Tooltip title="Configuration" placement="right">
        <StyledListItemButton
          disableRipple
          onClick={handleActiveMainMenu({
            title: "Configuration",
            Icon: SettingsOutlined,
            path: "/configuration",
          })}
        >
          <SettingsOutlined
            sx={{
              color:
                active === "Configuration" ? "primary.main" : "secondary.400",
            }}
          />
        </StyledListItemButton>
      </Tooltip>
    </List>
  );

  // main menus content
  const mainSideBarContent = (
    <List>
      <StyledListItemButton
        disableRipple
        onClick={handleActiveMainMenu(topMenuList[0])}
      >
        <DataSaverOnIcon color="success" sx={{ fontSize: 40 }} />
      </StyledListItemButton>

      {topMenuList.map((nav, index) => (
        <Tooltip title={nav.title} placement="right" key={index}>
          <StyledListItemButton
            disableRipple
            onClick={handleActiveMainMenu(nav)}
          >
            <nav.Icon
              sx={{
                color: active === nav.title ? "primary.main" : "secondary.400",
              }}
            />
          </StyledListItemButton>
        </Tooltip>
      ))}
    </List>
  );

  return (
    <MainMenu>
      {mainSideBarContent}

      <Box sx={{ flexGrow: 1 }} />
      {configurationButton}
    </MainMenu>
  );
}

export default DashboardSideBar;
