import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useLogin, useNotify, Notification } from 'react-admin';
import  { AuthProvider } from "react-admin";
import { Avatar, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const Login: (React.FC) = () => {
    const paperStyle = {padding: 20, height: '70vh', width: 280, margin: "20px auto"};
    return(
        <Grid>
            <Paper elevation = {10} style = {paperStyle}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Avatar><AccountCircleIcon/></Avatar>
                <h2>Sign In</h2>
                </Grid>
            </Paper>
        </Grid>
    )
    
};

export default Login;