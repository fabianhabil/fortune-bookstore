import { authService } from '../services/auth.service';
import { Errors } from '../utils/api.util';

import type { NextFunction, Request, Response } from 'express';
import type { TokenType } from '../typings/auth';

/**
 * Handles user authentication
 *
 * If this middleware is used on a route, it'll provide the ability
 * to use `req.userPayload`.
 *
 * @param tokenType the kind of to token should be check
 */
function authenticate(
    tokenType: TokenType = 'ACCESS') {

    return async (req: Request, _: Response, next: NextFunction) => {
        const payload = await authService.getPayloadFromRequest(req, tokenType);
        if (!payload) {
            throw Errors.NO_SESSION;
        }

        req.userPayload = payload;
        return next();
    };
}

export default authenticate;