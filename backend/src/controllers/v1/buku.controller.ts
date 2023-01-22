import {
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseBefore
} from 'routing-controllers';
import { Service } from 'typedi';
import { BukuService } from '../../services/buku.service';
import { Errors, sendResponse } from '../../utils/api.util';
import { Response } from 'express';
import { CreateBukuDTO, EditBukuDTO } from '../../validations/buku.validation';
import { UserPayload } from '../../typings/auth';
import multer from 'multer';

@Service()
@JsonController('/v1/books')
export class BukuController {
    constructor(protected readonly service: BukuService) {}

    @Get('/')
    async getAllBooks(@Res() res: Response) {
        const books = await this.service.getAll();

        return sendResponse(res, {
            message: 'Successfully found all books',
            data: { books }
        });
    }

    @Get('/:bookId')
    async getBook(@Res() res: Response, @Param('bookId') bookId: number) {
        const book = await this.service.getBook(bookId);

        return sendResponse(res, {
            message: 'Successfully found one books',
            data: { book }
        });
    }

    @Post('/')
    @UseBefore(
        multer({ dest: '../../images' }).fields([
            { maxCount: 1, name: 'bukuImage' }
        ])
    )
    async addBook(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        @Req() req: any,
        @Res() res: Response,
        @Body() dto: CreateBukuDTO,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        const allowedMimeTypes = ['image/jpg'];
        const fileOne = req.file.bukuImage[0];

        if (!allowedMimeTypes.includes(fileOne.mimetype)) {
            throw Errors.UNSUPPORTED_IMAGE_TYPE;
        }

        await this.service.addBook(userId, dto);

        return sendResponse(res, { message: 'Successfuly create one book' });
    }

    @Delete('/:bookId')
    async deleteBook(
        @Res() res: Response,
        @Param('bookId') bookId: number,
        @CurrentUser({ required: true }) user: UserPayload
    ) {
        const { userId } = user;
        await this.service.deleteBook(userId, bookId);

        return sendResponse(res, { message: 'Book deleted!' });
    }

    @Put('/:bookId')
    async editBook(
        @Res() res: Response,
        @Param('bookId') bookId: number,
        @CurrentUser({ required: true }) user: UserPayload,
        @Body() dto: EditBukuDTO
    ) {
        const { userId } = user;
        await this.service.editBook(userId, bookId, dto);

        return sendResponse(res, { message: 'Book edited!' });
    }
}
