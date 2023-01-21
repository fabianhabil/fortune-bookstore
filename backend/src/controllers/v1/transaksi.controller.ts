import { Response } from 'express';
import {
    Body,
    CurrentUser,
    Get,
    JsonController,
    Post,
    Put,
    Res
} from 'routing-controllers';
import { Service } from 'typedi';
import { TransaksiService } from '../../services/transaksi.service';
import { sendResponse } from '../../utils/api.util';
import { UserPayload } from '../../typings/auth';
import {
    BayarTransaksiDTO,
    CreateTransaksiDTO,
    EditTransaksiDTO
} from '../../validations/transaksi.validation';

@Service()
@JsonController('/v1/transaksi')
export class TransaksiController {
    constructor(private readonly service: TransaksiService) {}

    @Get('/')
    async getTransaksi(@Res() res: Response) {
        const transaksi = await this.service.get();

        return sendResponse(res, {
            message: 'Successfully found all transaksi',
            data: { transaksi }
        });
    }

    @Post('/')
    async createTransaksi(
        @Res() res: Response,
        @Body() dto: CreateTransaksiDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.createTransaksi(dto, userId);

        return sendResponse(res, { message: 'Successfully create transaksi' });
    }

    @Put('/')
    async editTransaksi(
        @Res() res: Response,
        @Body() dto: EditTransaksiDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.editTransaksi(dto, userId);

        return sendResponse(res, { message: 'Transaksi Edited' });
    }

    @Put('/bayar')
    async bayarTransaksi(
        @Res() res: Response,
        @Body() dto: BayarTransaksiDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.bayarTransaksi(dto, userId);

        return sendResponse(res, { message: 'Payment success' });
    }
}
