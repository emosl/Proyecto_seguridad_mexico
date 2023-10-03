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
  ListGuesser 
} from "react-admin";
import React from 'react';
import { dataProvider } from "./Providers/dataProvider";
import { UserList } from "./Pages/users";
import { PostList, PostEdit, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./Pages/Dashboard";
import { authProvider } from "./Providers/authProvider";
import { i18nProvider } from "./Providers/i18nProvider";
import { Button } from "@mui/material";
import { MyAppBar } from "./components/MyAppBar";
//import {MyLoginPage} from "./components/MyLoginPage";
import Login from "./Pages/Login"
import MyLayout from './Layout/MyLayout';
import { render, screen } from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
// import { useCanAccess } from '@react-admin/ra-rbac';

export const App = () => (
  <Admin
    layout={MyLayout}
    loginPage={Login}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
    darkTheme={{ palette: { mode: "dark" } }}
  >
    <Resource name="tickets" list={ListGuesser} />
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource name="users" list={UserList} />
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
    />
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
      icon={UserIcon}
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



