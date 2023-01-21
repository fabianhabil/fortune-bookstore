import { Body, Get, JsonController, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { PenerbitService } from '../../services/penerbit.service';
import { Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { PenerbitDTO } from '../../validations/penerbit.validation';

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
    async createPenerbit(@Res() res: Response, @Body() dto: PenerbitDTO) {
        await this.service.createPenerbit(dto);

        return sendResponse(res, {
            message: 'Successfully create one penerbit'
        });
    }
}
