import { UserService } from './../../services/user.service';
import {
    Body,
    CurrentUser,
    Get,
    JsonController,
    Post,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { UserPayload } from '../../typings/auth';

@Service()
@JsonController('/v1/users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('/profile')
    async getProfile(
        @Res() res: Response,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        const profile = await this.service.getProfile(userId);
        return sendResponse(res, {
            message: 'Success getting user profile',
            data: { profile }
        });
    }

    @Post('/topup')
    async topupUser(
        @Res() res: Response,
        @Body() dto: { saldo: number },
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        const userPayload = await this.service.topup(userId, dto);

        return sendResponse(res, {
            message: 'Topup success',
            data: { userPayload }
        });
    }
}
