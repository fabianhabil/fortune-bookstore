import assert from 'assert';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../configs/config';

import { Service } from 'typedi';
import { StatusCodes } from 'http-status-codes';
import { RefreshToken } from '../database/entities/refresh-token.entity';
import { User } from '../database/entities/user.entity';
import { isString } from 'class-validator';

import {
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    Errors,
    ResponseError
} from '../utils/api.util';

import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { LoginDTO, RegisterDTO } from '../validations/user.validation';
import type { UserPayload, TokenType, LoginInfo } from '../typings/auth';

@Service()
export class AuthService {

    /* Query SQL Login
       userQuery = SELECT * FROM user WHERE email = body.email
       IF MATCH
          IF bcryptCompare userQuery.password and body.password
          THEN GENERATE JWT TOKEN SET TO CLIENT AND RETURN userQuery
       ELSE
          RETURN ERROR
    */
    async login({ email, password }: LoginDTO): Promise<LoginInfo> {
        const foundUser = await User.findOneBy({ email });

        if (!foundUser) {
            throw new ResponseError(
                'Account is not registered!',
                StatusCodes.NOT_FOUND
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordValid) {
            throw new ResponseError(
                'Incorrect password',
                StatusCodes.BAD_REQUEST
            );
        }

        const accessToken = await this.generateToken(foundUser, 'access');
        const refreshToken = await this.generateToken(foundUser, 'refresh');

        return { accessToken, refreshToken, foundUser };
    }

    async register(rawUser: RegisterDTO) {
        const user = User.create({ ...rawUser });

        const foundUser = await User.findOneBy({ email: user.email });
        if (foundUser) {
            throw new ResponseError(
                'This email is already registered',
                StatusCodes.CONFLICT
            );
        }

        user.password = await this.hashPassword(user.password);
        await User.save(user);
    }

    async logout(refreshToken?: string) {
        if (!refreshToken) {
            throw Errors.NO_SESSION;
        }

        const foundToken = await RefreshToken.findOneBy({
            token: refreshToken
        });

        await foundToken?.remove();
    }

    async refresh(payload?: UserPayload) {
        if (!payload) {
            throw Errors.NO_SESSION;
        }

        return this.generateToken(payload, 'access');
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, config.hashRounds);
    }

    private async generateToken(
        user: User | UserPayload,
        tokenType: TokenType
    ) {
        let tokenSecret: string;

        const signOption: jwt.SignOptions = {};
        const payload: UserPayload = { userId: user.userId };

        if (tokenType === 'access') {
            tokenSecret = config.jwt.accessSecret;
            signOption.expiresIn = config.jwt.accessExpire;
        } else {
            tokenSecret = config.jwt.refreshSecret;
            signOption.expiresIn = config.jwt.refreshExpire;
        }

        const token = jwt.sign(payload, tokenSecret, signOption);
        if (tokenType === 'refresh') {
            const newToken = RefreshToken.create({ token, user });
            await newToken.save();
        }

        return token;
    }

    /**
     * Extracts a user data (payload) from a JWT token.
     * Before it extracts the payload, it'll verify the token first.
     */
    async getUserPayload(req: Request, tokenType: TokenType) {
        let secret: string;
        let token: string;

        switch (tokenType) {
            case 'access':
                token = req.cookies[ACCESS_TOKEN_COOKIE];
                secret = config.jwt.accessSecret;
                break;
            case 'refresh':
                token = req.cookies[REFRESH_TOKEN_COOKIE];
                secret = config.jwt.refreshSecret;
                break;
        }

        // the value from `cookies` can be undefined,
        // although I set it to `string` in the type because `class-validator`
        // doesn't force type after this condition.
        if (!isString(token)) {
            return;
        }

        if (tokenType === 'refresh') {
            try {
                const refreshToken = await RefreshToken.findOneBy({ token });
                assert(refreshToken);
            } catch (err) {
                return;
            }
        }

        try {
            const payload = jwt.verify(token, secret) as JwtPayload;
            return { userId: payload.userId } as UserPayload;
        } catch (err) {
            // token is invalid, so returning `undefined` instead
        }
    }

}
