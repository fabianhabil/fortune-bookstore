import { AuthService } from '../../services/auth.service';
import ms from 'ms';
import config from '../../configs/config';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginDTO, RegisterDTO } from '../../validations/user.validation';

import {
    REFRESH_TOKEN_COOKIE,
    ACCESS_TOKEN_COOKIE,
    sendResponse
} from '../../utils/api.util';
import {
    JsonController,
    Body,
    CookieParam,
    Req,
    Res,
    Delete,
    Post
} from 'routing-controllers';

@Service()
@JsonController('/v1/auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @Post('/login')
    async login(@Res() res: Response, @Body() dto: LoginDTO) {
        const { accessToken, refreshToken } = await this.service.login(dto);

        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
            httpOnly: true,
            maxAge: ms(config.jwt.refreshExpire)
        });

        res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
            httpOnly: true,
            maxAge: ms(config.jwt.accessExpire)
        });

        return sendResponse(res, { message: 'Successfully logged in' });
    }

    @Post('/register')
    async register(@Res() res: Response, @Body() dto: RegisterDTO) {
        await this.service.register(dto);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully registered new user'
        });
    }

    @Post('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const payload = await this.service.getUserPayload(req, 'refresh');
        const accessToken = await this.service.refresh(payload);

        res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
            httpOnly: true,
            maxAge: ms(config.jwt.accessExpire)
        });

        return sendResponse(res, {
            message: 'Successfully refreshed new token'
        });
    }

    @Delete('/logout')
    async logout(
        @Res() res: Response,
        @CookieParam(REFRESH_TOKEN_COOKIE) refreshToken: string
    ) {
        try {
            await this.service.logout(refreshToken);
        } finally {
            res.clearCookie(ACCESS_TOKEN_COOKIE);
            res.clearCookie(REFRESH_TOKEN_COOKIE);
        }

        return sendResponse(res, {
            statusCode: StatusCodes.ACCEPTED,
            message: 'Successfully logged out'
        });
    }

}
