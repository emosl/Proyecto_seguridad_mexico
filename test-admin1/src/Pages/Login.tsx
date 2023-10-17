//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 
//imports from react, react-admin and proyect
import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
import "./Login.css";
import "./App.css";
import { url } from "inspector";

//Login component for the admin page
export const Login: React.FC = () => {
  const login = useLogin();
  const notify = useNotify();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  // will call authProvider.login({ email, password })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const auth = await login({ username: email, password: password });
        console.log("Auth Response:", auth); 

        if (auth && auth.rol) {
            setUserRole(auth.rol);
            localStorage.setItem('userRole', auth.rol);
            console.log("User Role:", auth.rol);
        }
    } catch {
        notify("Invalid email or password");
    }
};

//Login component for the admin page
  return (
    <body className="body">

      <div className="fotobg"> </div>
      <div className="wrapper">
        <span className="bg-animate"></span>

        <div className="logo">
        <img
          className="logo"
          src="./src/Assets/fxm.png"
          alt="Fundación por México Logo"
          width="500"
          height="300"
        />
        </div>
      

        <div className="form-box login">
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


            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>

       
      </div>
    </body>
  );
};

export default Login;