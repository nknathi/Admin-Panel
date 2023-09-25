// AuthProvider is a component that provides authentication-related functionality to the application.
import { AuthProvider } from "react-admin";

// defining an object called authProvider of type AuthProvider. 
// This object will contain methods and configurations related to authentication.
export const authProvider: AuthProvider = {
    // called when user attemps to login
    // takes an object with a username property as an argument
    login: ({ username }) => {
        // stores the username in the browser's localStorage
        localStorage.setItem("username", username);
        // Note that this implementation doesn't perform any actual authentication and
        // accept all username/passwords combinations
        return Promise.resolve();
    },
    // called when the user click on the logout button
    logout: () => {
        // removes the username from the localStorage
        localStorage.removeItem("username");
        // returns a resolved Promise to indicate a successful logout
        return Promise.resolve();
    },
    // called when the API returns an error
    // takes an object with a status property, which represents the HTTP status code of the error response
    checkError: ({ status }: { status: number}) => {
        if (status === 401 || status === 403) {
            // removes the username from localStorage
            localStorage.removeItem("username");
            // returns a rejected Promise to indicate an authentication error
            return Promise.reject();
        }
        // returns a resolved Promise.
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        // checks if the username is stored in localStorage. 
        // If it is, it returns a resolved Promise, indicating that the user is authenticated. Otherwise,
        // it returns a rejected Promise, indicating that the user is not authenticated.
        return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    // always returns a resolved Promise without checking permissions, indicating that the user has all permissions.
    getPermissions: () => Promise.resolve(),
};