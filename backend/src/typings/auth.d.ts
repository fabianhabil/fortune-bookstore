export type TokenType = 'ACCESS' | 'REFRESH';

export interface UserPayload {
    id: number;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}