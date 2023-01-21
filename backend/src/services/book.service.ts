import { Service } from 'typedi';
import { Buku } from '../database/entities/buku.entity';
import { Errors } from '../utils/api.util';
import { UserService } from './user.service';
import type { CreateBukuDTO } from '../validations/buku.validation';

@Service()
export class BookService {
    constructor(private readonly userService: UserService) {}

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

    async createBook(userId: number, dto: CreateBukuDTO) {
        const user = await this.userService.isAdmin(userId);

        if (user) {
            throw Errors.NO_PERMISSION;
        }

        const book = Buku.create({ ...dto });
        await Buku.save(book);
    }
}
