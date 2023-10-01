import * as React from 'react';
import { useState } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useLogin, useNotify, Button, Link } from 'react-admin';
import { Avatar, FormControlLabel, Grid, TextField, Checkbox, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./App.css"
import backgroundImage from '../assets/654730.jpg';




const SignUp = () => {

    // Estilo del paper
    const paperStyle: PaperProps['style'] = {
        padding: 20,
        width: 280,
        margin: '20px auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '20px',
        boxShadow: '10px 20px 25px -5px rgba(0,0,0,0.75)',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#170212',
        
    };

    // Estilo del grid
    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    // Estilo del avatar
    const avatarStyle = { backgroundColor: '#F5494C' };

    return(
        <Grid container style={gridStyle} >
            <Paper elevation={10} style={paperStyle} >
                <Grid>
                    <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                    <h2>Sign Up</h2>
                    <Typography variant='caption' gutterBottom></Typography>
                </Grid>

            </Paper>
        </Grid>
    )
    
};

export default SignUp;