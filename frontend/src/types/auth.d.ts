export interface AuthContextType<T> {
    isAuthenticated: boolean;
    userData: T | null;
    getUserData: () => void;
    loading: boolean;
    isLoggedIn: () => boolean;
    logout: () => void;
}
