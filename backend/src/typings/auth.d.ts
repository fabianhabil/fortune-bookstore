import type { User } from '../database/entities/user.entity';

export type TokenType = 'access' | 'refresh';

export interface UserPayload {
    userId: number;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginInfo {
    accessToken: string;
    refreshToken: string;
    foundUser: User;
}
