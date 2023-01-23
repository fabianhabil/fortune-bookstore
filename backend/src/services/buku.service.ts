/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Service } from 'typedi';
import { Buku } from '../database/entities/buku.entity';
import { Errors } from '../utils/api.util';
import { UserService } from './user.service';
import type {
    CreateBukuDTO,
    EditBukuDTO
} from '../validations/buku.validation';

@Service()
export class BukuService {
    constructor(private readonly userService: UserService) {}

    /*  Query SQL Get All Buku
        SELECT
            buku.id_buku,
            buku.nama,
            buku.deskripsi,
            buku.harga,
            buku.stok,
            buku.jumlah_halaman,
            buku.tanggal_terbit,
            buku.bahasa,
            buku.berat,
            buku.lebar,
            buku.panjang,
            penerbit.id_penerbit,
            penerbit.nama,
            kategori_buku.id_kategori_buku,
            kategori_buku.nama_kategori
        FROM
            buku
            LEFT JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit
            LEFT JOIN kategori_buku on buku.id_kategori_buku = kategori_buku.id_kategori_buku

        return bukuList
    */
    async getAll(): Promise<Buku[]> {
        const buku = await Buku.find({
            select: { penerbitId: false, kategoriBukuId: false },
            relations: { kategoriBuku: true, penerbit: true }
        });

        return buku;
    }

    /*  Query SQL Get Buku by ID
        bukuList =
        SELECT
            buku.id_buku,
            buku.nama,
            buku.deskripsi,
            buku.harga,
            buku.stok,
            buku.jumlah_halaman,
            buku.tanggal_terbit,
            buku.bahasa,
            buku.berat,
            buku.lebar,
            buku.panjang,
            penerbit.id_penerbit,
            penerbit.nama,
            kategori_buku.id_kategori_buku,
            kategori_buku.nama_kategori
        FROM
            buku
            LEFT JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit
            LEFT JOIN kategori_buku on buku.id_kategori_buku = kategori_buku.id_kategori_buku
            WHERE id_buku = body.bukuId
        return bukuList
    */
    async getBook(bukuId: number): Promise<Buku> {
        const buku = await Buku.findOneBy({ bukuId });

        if (!buku) {
            throw Errors.BOOK_NOT_FOUND;
        }

        return buku;
    }

    /*  Query SQL add buku
        INSERT INTO TABLE buku VALUES(body.nama, body.deskripsi, body.harga, body.stok,
            body.jumlahHalaman, body.tanggalTerbit, body.bahasa, body.berat, body.lebar,
            body.panjang, body.penerbitId, body.kategoriBukuId)
    */
    async addBook(userId: number, dto: CreateBukuDTO, file: any) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const book = Buku.create({
            ...dto,
            tanggalTerbit: new Date(dto.tanggalTerbit),
            imagePath: file.originalname
        });

        await Buku.save(book);
    }

    /*  Query SQL delete buku
        DELETE FROM TABLE buku WHERE id_buku = body.bukuId
    */
    async deleteBook(userId: number, bukuId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const book = await this.getBook(bukuId);

        await Buku.remove(book);
    }

    /*  Query SQL update buku
        UPDATE buku
        SET
            name = body.name;
            deskripsi = body.deskripsi;
            harga = body.harga;
            stok = body.stok;
            jumlahHalaman = body.jumlahHalaman;
            berat = body.berat;
            lebar = body.lebar;
            panjang = body.panjang;
        WHERE id_buku = body.bukuId

    */
    async editBook(userId: number, bukuId: number, dto: EditBukuDTO) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const book = await this.getBook(bukuId);
        book.name = dto.name ?? book.name;
        book.deskripsi = dto.deskripsi ?? book.deskripsi;
        book.harga = dto.harga ?? book.harga;
        book.stok = dto.stok ?? book.stok;
        book.jumlahHalaman = dto.jumlahHalaman ?? book.jumlahHalaman;
        book.berat = dto.berat ?? book.berat;
        book.lebar = dto.lebar ?? book.lebar;
        book.panjang = dto.panjang ?? book.panjang;

        return book.save();
    }

    /*  Query SQL Get All Buku by kategori buku
        SELECT
            buku.id_buku,
            buku.nama,
            buku.deskripsi,
            buku.harga,
            buku.stok,
            buku.jumlah_halaman,
            buku.tanggal_terbit,
            buku.bahasa,
            buku.berat,
            buku.lebar,
            buku.panjang,
            penerbit.id_penerbit,
            penerbit.nama,
            kategori_buku.id_kategori_buku,
            kategori_buku.nama_kategori
        FROM
            buku
            LEFT JOIN penerbit ON buku.id_penerbit = penerbit.id_penerbit
            LEFT JOIN kategori_buku on buku.id_kategori_buku = kategori_buku.id_kategori_buku
        WHERE buku.id_kategori_buku = body.id_kategori_buku

    */

    async getBookByFilter(penerbitId: string, kategoriId: number) {
        const query: any = {};

        if (penerbitId !== 'all') {
            query.penerbitId = penerbitId;
        }

        if (kategoriId !== 0) {
            query.kategoriBukuId = kategoriId;
        }

        const buku = await Buku.find({
            where: query,
            select: { penerbitId: false, kategoriBukuId: false },
            relations: { kategoriBuku: true, penerbit: true }
        });

        return buku;
    }
}
