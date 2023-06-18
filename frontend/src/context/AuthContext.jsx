import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ accessToken: null });
    const isAuthenticated = Boolean(auth.accessToken);
    return (
        <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;