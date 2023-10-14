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
import { PostList, PostEdit, PostCreate } from "./posts";
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

// import { useCanAccess } from '@react-admin/ra-rbac';

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
    {/* <Resource
      name="dashboard"
      list={ListGuesser}
      icon={UserIcon}
    /> */}
    <Resource
      name="dashboard"
      list={Dashboard} // You should create a Dashboard component for rendering the dashboard content// Add an icon for the dashboard
      options={{ label: "Dashboard" }} // Specify a label for the dashboard
      icon={UserIcon}
    />
    <Resource
      name="tickets"
      create={TicketsCreate}
      list={TicketsList}
      edit={TicketsEdit}
    />

  </Admin>
);

export const ThemeToggler = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    </Button>
  );
};
