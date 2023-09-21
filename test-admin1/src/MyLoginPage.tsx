import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

export const MyLoginPage: (React.FC) = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
                color: '#4287f5',
            }
        }>
        <form onSubmit={handleSubmit}
        style={
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',}
        }
        >
            <h1>My Login Page</h1>
            <input
                id='input-email'
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                id='input-pw'
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button  type="submit"> Login</button>
        </form>
        </div>
        
    );
};

export default MyLoginPage;
