export type TokenType = 'access' | 'refresh';

export interface UserPayload {
    idUser: number;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}