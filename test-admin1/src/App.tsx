//imports from react-admin, materia ui, and react
import {
  Admin,
  Resource,
  ShowGuesser,
  defaultTheme,
  useTheme,
  Layout,
  useRecordContext,
  DeleteButton,
  AdminContext,
  ListGuesser,
} from "react-admin";
import React from "react";
import { dataProvider } from "./Providers/dataProvider";
import { UserList } from "./Pages/users";
import { TicketsCreate, TicketsList, TicketsEdit } from "./Pages/tickets";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./Pages/Dashboard";
import { authProvider } from "./Providers/authProvider";
import { i18nProvider } from "./Providers/i18nProvider";
import { Button } from "@mui/material";
import { MyAppBar } from "./components/MyAppBar";
//import {MyLoginPage} from "./components/MyLoginPage";
import Login from "./Pages/Login";
import MyLayout from "./Layout/MyLayout";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";

//App component for the admin page
//Resources are the pages that are displayed on the admin page
//Includes the dashboard and Tickets
export const App = () => (
  <Admin
    layout={MyLayout}
    loginPage={Login}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    // dashboard={Dashboard}
    darkTheme={{ palette: { mode: "dark" } }}
  >
     <Resource
      name="tickets"
      create={TicketsCreate}
      list={TicketsList}
      edit={TicketsEdit}
    />
    <Resource
      name="dashboard"
      list={Dashboard} 
      options={{ label: "Dashboard" }} 
      icon={UserIcon}
    />
  </Admin>
);

//Theme toggler for the admin page
//Allows the user to switch between light and dark mode
export const ThemeToggler = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    </Button>
  );
};
