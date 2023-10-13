import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        const request = new Request('http://127.0.0.1:8000/login', {
            method: 'POST',
            body: JSON.stringify({ "usuario":username, "contraseña": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            // console.log(response);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
                console.log("Error");
            }
            // console.log("Response",response);
            const auth = await response.json();
            localStorage.setItem('auth', auth.token);
            // console.log("Auth",auth);
            localStorage.setItem('identity',  JSON.stringify({"username": auth.usuario,  "nombre":auth.nombre}));
            localStorage.setItem('username',  auth.usuario);
            localStorage.setItem('rol',  auth.rol);
            // return Promise.resolve()
            return Promise.resolve(auth);
        } catch {
            throw new Error('Error en usuario o password');
        }
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
        localStorage.removeItem("identity");
        localStorage.removeItem("userRole");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("rol");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("rol")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};