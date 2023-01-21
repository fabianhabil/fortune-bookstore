/* eslint-disable max-len */
import type { KategoriBukuDTO } from './../validations/kategori-buku.validation';
import { KategoriBuku } from './../database/entities/kategori-buku.entity';
import { Service } from 'typedi';
import { UserService } from './user.service';
import { Errors } from '../utils/api.util';

@Service()
export class KategoriBukuService {
    constructor(private readonly userService: UserService) {}

    /*  Query SQL Get All Kategori Buku
        SELECT * FROM kategori_buku
    */
    async get(): Promise<KategoriBuku[]> {
        const kategoriBuku = await KategoriBuku.find({});

        return kategoriBuku;
    }

    /*  Query SQL Create Kategori Buku
        INSERT INTO TABLE kategori_buku VALUES(body.namaKategoriBuku)
    */
    async add(dto: KategoriBukuDTO, userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const kategoriBuku = KategoriBuku.create({ ...dto });

        await KategoriBuku.save(kategoriBuku);
    }
}
