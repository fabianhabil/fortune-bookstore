import {
    Body,
    CurrentUser,
    Get,
    JsonController,
    Post,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { PenerbitService } from '../../services/penerbit.service';
import { Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { PenerbitDTO } from '../../validations/penerbit.validation';
import { UserPayload } from '../../typings/auth';

@Service()
@JsonController('/v1/penerbit')
export class PenerbitController {
    constructor(protected readonly service: PenerbitService) {}

    @Get('/')
    async getPenerbit(@Res() res: Response) {
        const penerbit = await this.service.getPenerbit();

        return sendResponse(res, {
            message: 'Successfully found all penerbit',
            data: { penerbit }
        });
    }

    @Post('/')
    async addPenerbit(
        @Res() res: Response,
        @Body() dto: PenerbitDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.addPenerbit(dto, userId);

        return sendResponse(res, {
            message: 'Successfully create one penerbit'
        });
    }
}
