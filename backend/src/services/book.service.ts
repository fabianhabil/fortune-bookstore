import { Service } from 'typedi';
import { Buku } from '../database/entities/buku.entity';
import { Errors } from '../utils/api.util';

@Service()
export class BookService {
    async getAll() {
        const buku = await Buku.find();

        return buku;
    }

    async getBook(bookId: number) {
        const buku = await Buku.findOneBy({ bukuId: bookId });

        if (!buku) {
            throw Errors.BOOK_NOT_FOUND;
        }

        return buku;
    }
}
