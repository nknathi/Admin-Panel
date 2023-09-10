import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when user attemps to login
    login: ({ username }) => {
        localStorage.setItem("username", username);
        // accept all username/passwords combinations
        return Promise.resolve();
    },
    // called when the user click on the logout button
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number}) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};