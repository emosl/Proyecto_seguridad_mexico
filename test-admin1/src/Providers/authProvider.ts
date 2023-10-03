import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        const request = new Request('http://127.0.0.1:5173/login', {
            method: 'POST',
            body: JSON.stringify({ "usuario":username, "contraseña": password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        try {
            const response = await fetch(request);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            const auth = await response.json();
            localStorage.setItem('auth', auth.token);
            localStorage.setItem('identity',  JSON.stringify({"id": auth.id,  "usuario":auth.usuario}));
            return Promise.resolve()
        } catch {
            throw new Error('Error en usuario o password');
        }
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};