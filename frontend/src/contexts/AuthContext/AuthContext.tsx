import ToastSuccess from '@/components/atoms/Toast/ToastSuccess';
import api from '../../api/axios-instance';
import type { AuthContextType } from '@/types/auth';
import type { UserDataType } from '@/types/user';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
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
    const router = useRouter();

    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem('user-data') as string);
        if (data) {
            setUserData(() => data);
            setIsAuthenticated(() => true);
            setLoading(() => false);
        } else {
            setLoading(() => false);
            setIsAuthenticated(() => false);
        }
    };

    const isLoggedIn = () => {
        const data = JSON.parse(localStorage.getItem('user-data') as string);
        if (data) {
            return true;
        }
        return false;
    };

    const logout = async () => {
        localStorage.removeItem('user-data');
        try {
            const response = await api.delete('/auth/logout');
            if (response) {
                ToastSuccess('Logout Success!');
                setTimeout(() => {
                    router.reload();
                }, 500);
            }
        } catch (e) {
            if (isAxiosError(e)) {
                console.log(e);
            } else {
                console.log(e);
            }
        }
    };

    const value = {
        getUserData,
        userData,
        isAuthenticated,
        loading,
        isLoggedIn,
        logout
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
