import * as React from 'react';
import { useState } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useLogin, useNotify, Button, Link } from 'react-admin';
import { Avatar, FormControlLabel, Grid, TextField, Checkbox, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./App.css"
import backgroundImage from '../assets/654730.jpg';

export const Login: (React.FC) = () => {
    const login = useLogin();
    const notify = useNotify();

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

    // Componentes de email, password y rememberMe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    
    // Función para el submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Llama a la función login de react-admin
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };
    
    // Retorna el formulario
    return (
        <Grid container style={gridStyle} >
            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle} >
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                        <h2>Iniciar sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                placeholder="Enter username"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style = {{
                                        marginBottom: '10px', 
                                        borderRadius: '20px', 
                                        padding: '2px', 
                                        fontSize: '12px'
                                    }}
                                InputProps={{ sx: { borderRadius: 3 } }}

                                
                            />
                            <TextField
                                label="Password"
                                placeholder="Enter password"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style = {{
                                        borderRadius: '10px',
                                        padding: '2px'
                                     
                                    }}
                                InputProps={{ sx: { borderRadius: 3 } }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        color="primary"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                }
                                label="Remember me"
                            />
                            
                            <Button
                            type="submit"
                            variant="contained" 
                            style={{ borderRadius: 10 , color: "#000000", backgroundColor: "#F5494C", marginBottom: '10px',}}
                            fullWidth
                            >
                            <Typography>Iniciar sesión</Typography>
                            </Button>
                        </form>
                        <Typography style={{ marginBottom: '10px' }}>
                            <Link to={''} >¿Olvidaste tu contraseña?</Link>
                            
                        </Typography >
                        <Typography>
                            ¿No tienes cuenta? <Link to={''}>Registrarse</Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;