import authenticate from '../../middlewares/authenticate.middleware';
import ms from 'ms';
import config from '../../configs/config';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../../services/auth.service';
import { loginSchema, registerSchema } from '../../validations/user.validation';
import { validate } from '../../utils/validate.util';

import {
    Controller,
    ReqHandler,
} from '../../internals/decorators/express.decorator';

import {
    sendResponse,
    REFRESH_TOKEN_COOKIE,
} from '../../utils/api.util';

@Controller({ path: 'auth' })
export class AuthController {

    @ReqHandler('POST', '/login')
    async login(req: Request, res: Response) {
        const body = validate(req, loginSchema);
        const { accessToken, refreshToken } = await authService.login(body);

        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
            httpOnly: true,
            maxAge: ms(config.jwt.refreshExpire),
        });

        return sendResponse(res, {
            message: 'Successfully logged in',
            data: { accessToken },
        });
    }

    @ReqHandler('POST', '/register')
    async register(req: Request, res: Response) {
        const body = validate(req, registerSchema);
        await authService.register(body);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully registered new user',
        });
    }

    @ReqHandler('POST', '/refresh', authenticate('REFRESH'))
    async refresh(req: Request, res: Response) {
        const { userPayload } = req;
        const accessToken = await authService.refresh(userPayload!);

        return sendResponse(res, {
            message: 'Successfully refreshed new token',
            data: { accessToken },
        });
    }

    @ReqHandler('DELETE', '/logout', authenticate('REFRESH'))
    async logout(req: Request, res: Response) {
        const token = authService.getTokenFromRequest(req, 'REFRESH')!;
        await authService.logout(token);

        res.clearCookie(REFRESH_TOKEN_COOKIE);

        return sendResponse(res, {
            statusCode: StatusCodes.ACCEPTED,
            message: 'Successfully logged out',
        });
    }

}