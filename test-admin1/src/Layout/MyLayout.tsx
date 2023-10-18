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
    <MyLogoutButton />
    <MyRefreshButton />
    
  </UserMenu>
);

//MyAppBar component for the admin page
export const MyAppBar= () => (
  <AppBar
    userMenu={<MyUserMenu />}
    
    color="transparent"
  /> 

);

const MyLayout: React.FC = (props) => <Layout {...props} appBar={MyAppBar} />;

//export MyLayout component
export default MyLayout;
