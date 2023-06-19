import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/UserService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuthState] = useState({ isAuthenticated: false });

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (token) {
            setAuthState({ isAuthenticated: true });
        }
    }, []);

    const setAuth = (isAuthenticated) => setAuthState({ isAuthenticated });

    const login = async (credentials) => {
        try {
            console.log('Login attempt with credentials:', credentials);
            const response = await axios.post(API_URL + 'api/login', credentials, { withCredentials: true });
            if (response.status === 200) {
                console.log('Login successful.');
                sessionStorage.setItem('jwt', response.data.jwt);
                setAuth(true);
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Login failed with error:', error);
        }
    };

    const logout = async () => {
        console.log('Logout attempt');
        try {
            await axios.post(API_URL + 'api/logout', {}, { withCredentials: true });
            console.log('Logout successful. Auth state reset.');
            sessionStorage.removeItem('jwt');
            setAuth(false);
        } catch (error) {
            console.error('Logout failed with error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;