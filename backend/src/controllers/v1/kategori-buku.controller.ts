import {
    Body,
    CurrentUser,
    Get,
    JsonController,
    Post,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { KategoriBukuService } from '../../services/kategori-buku.service';
import { Response } from 'express';
import { sendResponse } from '../../utils/api.util';
import { KategoriBukuDTO } from '../../validations/kategori-buku.validation';
import { UserPayload } from '../../typings/auth';

@Service()
@JsonController('/v1/kategori')
export class KategoriBukuController {
    constructor(protected service: KategoriBukuService) {}

    @Get('/')
    async getKategoriBuku(@Res() res: Response) {
        const kategoriBuku = await this.service.get();

        return sendResponse(res, {
            message: 'Successfully found all penerbit',
            data: { kategoriBuku }
        });
    }

    @Post('/')
    async addKategoriBuku(
        @Res() res: Response,
        @Body() dto: KategoriBukuDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.add(dto, userId);

        return sendResponse(res, { message: 'Successfully add kategori buku' });
    }
}
