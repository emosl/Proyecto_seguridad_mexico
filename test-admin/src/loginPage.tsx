import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';


const LoginPage =  () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = useLogin()
    const notify = useNotify()
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        console.log({email,password})
        e.preventDefault()
        login(
            {
                email,password

            }
        )
        .catch(() => notify("Login failed"))
    
    }

    return (
    
        <form onSubmit={handleSubmit}>
        <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}

        />
        <button>
            login
        </button>
    </form>)
    
}



export default LoginPage