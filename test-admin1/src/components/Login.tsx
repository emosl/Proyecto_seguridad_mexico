import * as React from 'react';
import { useState } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import { useLogin, useNotify, Button, Link } from 'react-admin';
import { Avatar, FormControlLabel, Grid, TextField, Checkbox, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.jpg';

export const Login: (React.FC) = () => {
    const login = useLogin();
    const notify = useNotify();
    const paperStyle: PaperProps['style'] = {
        padding: 20,
        width: 280,
        margin: '20px auto',
        position: 'absolute',
        top: '50%',
        left: '25%',
        borderRadius: '20px',
        boxShadow: '10px 20px 25px -5px rgba(0,0,0,0.75)',
        transform: 'translate(-50%, -50%)',
        
    };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                        <h2>Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                placeholder="Enter username"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style = {{marginBottom: '10px', borderRadius: '20px'}}
                                
                            />
                            <TextField
                                label="Password"
                                placeholder="Enter password"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style = {{borderRadius: '10px'}}
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
                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                <Typography>Sign in</Typography>
                            </Button>
                        </form>
                        <Typography>
                            <Link to={''}>Forgot Password?</Link>
                        </Typography>
                        <Typography>
                            Do you have an account? <Link to={''}>Sign Up</Link>
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;