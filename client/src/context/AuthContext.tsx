import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface IAuthContext {
    token: string | null;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
    token: null,
    setToken: () => {
        /* do nothing */
    },
});

const AuthProvider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [token, _setToken] = useState<string | null>(localStorage.getItem('token'));

    const setToken = (newToken: string) => _setToken(newToken);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const ctxVal = React.useMemo(() => ({ token, setToken }), [token]);

    return <AuthContext.Provider value={ctxVal}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
