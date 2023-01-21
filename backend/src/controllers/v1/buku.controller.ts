import { Get, JsonController, Param, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { BookService } from '../../services/book.service';
import { sendResponse } from '../../utils/api.util';
import { Response } from 'express';

@Service()
@JsonController('/v1/books')
export class BookController {
    constructor(protected readonly service: BookService) {}

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
}
