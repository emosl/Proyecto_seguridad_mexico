//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software

//imports from react, react-admin and material ui
import * as React from "react";
import { forwardRef } from "react";

import {
  AppBar,
  Layout,
  UserMenu,
  useLogout,
  ToggleThemeButton,
  RefreshButton,
} from "react-admin";
import { MenuItem } from "@mui/material";
import ExitIcon from "@mui/icons-material/PowerSettingsNew";
import { authProvider } from "../Providers/authProvider";
import { blue } from "@mui/material/colors";
import logo from "../Assets/FXM_AB_SF.png"

//MyLogoutButton component for the admin page
export const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    <MenuItem
      onClick={handleClick}
      // ref={ref}
      // // It's important to pass the props to allow Material UI to manage the keyboard navigation
      // {...props}
    >
      <ExitIcon /> Logout
    </MenuItem>
  );
});

const MyUserName: React.FC = () => {
  const username = localStorage.getItem("username");
  return (
    <span
      style={{
        display: "block",
        textAlign: "center",
        width: "100%",
        fontWeight: "bold",
        color: blue[500],
      }}
    >
      {username}
    </span>
  );
};

const MyRefreshButton = () => {
  const handleClick = () => window.location.reload();
  return (
    <MenuItem
      onClick={handleClick}
      // ref={ref}
      // // It's important to pass the props to allow Material UI to manage the keyboard navigation
      // {...props}
    >
      <ExitIcon /> Refresh
    </MenuItem>
  );
};

//MyUserMenu component for the admin page
export const MyUserMenu: React.FC = () => (
  <UserMenu>
    <MyUserName />
    <MyLogoutButton />
    <MyRefreshButton />
  </UserMenu>
);

//MyAppBar component for the admin page
export const MyAppBar = () => (
  <AppBar userMenu={<MyUserMenu />} color="transparent">
    <img src={logo} alt="logo" width="100" height="50" />
    <span style={{ flex: 1 }} />
  </AppBar>
);

const MyLayout: React.FC = (props) => <Layout {...props} appBar={MyAppBar} />;

//export MyLayout component
export default MyLayout;
