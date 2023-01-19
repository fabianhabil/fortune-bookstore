import { UserService } from './../../services/user.service';
import { CurrentUser, Get, JsonController, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';

@Service()
@JsonController('/v1/users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('/profile')
    async getProfile(
        @Res() res: Response,
        @CurrentUser({ required: true }) payload: number
    ) {
        const user = await this.service.getProfile(payload);
        return sendResponse(res, { message: 'Success', data: { user } });
    }
}
