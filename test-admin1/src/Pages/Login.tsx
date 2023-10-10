import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import "./Login.css";
import "./App.css";

export const Login: React.FC = () => {
    const login = useLogin();
    const notify = useNotify();

 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
   
    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
       try{
        await login({ username: email, password: password })
         // .then(() => {
        //     window.location.href = '/tickets'; 
        // })
       }catch{
        notify('Invalid email or password');
       }
        // .catch(() => {
        //     notify('Invalid email or password'); 
        // });
    };

    return (
        <body className="body">
        <div className="wrapper">
            <span className="bg-animate">
            </span>
            <div className="form-box login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="text" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
            <div>
            <img className = "logo"
                    src="https://www.pormexicofundacion.org/images/logo-wide.png" 
                    alt="Fundación por México Logo"
                    width="500" 
                    height="300" 
                />
            </div>
            <div className="info-text login">
                <h2>Bienvenido</h2>
                <p>Sistema de Tickets Fundación por México</p>
            </div>
        </div>
        </body>
    );
};

export default Login;
