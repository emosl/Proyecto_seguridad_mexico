import * as React from 'react';
import { useState } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import backgroundImage from '../assets/654730.jpg';
import bcrypt from 'bcrypt';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Hashear la contraseña antes de enviarla al servidor
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

        // Aquí puedes realizar la lógica de registro, enviando la contraseña hasheada al servidor
        const user = {
            username: formData.username,
            email: formData.email,
            password: hashedPassword, // Enviar la contraseña hasheada
        };

        // Luego puedes enviar 'user' al servidor para el registro
        console.log(user);
    };

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

    const gridStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const avatarStyle = { backgroundColor: '#F5494C' };

    return (
        <Grid container style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <Avatar style={avatarStyle}>
                        <AccountCircleIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            placeholder="Enter your username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            <Typography>Sign Up</Typography>
                        </Button>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default SignUp;
