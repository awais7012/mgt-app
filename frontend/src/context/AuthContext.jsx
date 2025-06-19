import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
        user: null,
        role: null
    });

    const login = (userData, token, userRole) => {
        setAuth({
            isAuthenticated: true,
            token,
            user: userData,
            role: userRole
        });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, token: null, user: null, role: null });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
