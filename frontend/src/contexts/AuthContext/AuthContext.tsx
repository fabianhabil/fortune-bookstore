// import API from '@/api/axios-instance';
import type { AuthContextType } from '@/types/auth';
import type { UserDataType } from '@/types/user';
import { createContext, useState } from 'react';

interface AuthContextProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType<UserDataType> | null>(null);

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children
}) => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            setUserData(() => data);
            setIsAuthenticated(() => true);
            setLoading(() => false);
        } else {
            setLoading(() => false);
            setIsAuthenticated(() => false);
        }
    };

    const value = {
        getUserData,
        userData,
        isAuthenticated,
        loading
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
