import type { User } from './../database/entities/user.entity';
import { appDataSource } from './../database/datasource';
import { UserService } from './user.service';
import type {
    BayarTransaksiDTO,
    CreateTransaksiDTO,
    EditTransaksiDTO
} from './../validations/transaksi.validation';
import { Service } from 'typedi';
import { Transaksi } from '../database/entities/transaksi.entity';
import { BukuService } from './buku.service';
import { Errors } from '../utils/api.util';

@Service()
export class TransaksiService {
    constructor(
        private readonly userService: UserService,
        protected readonly bukuService: BukuService
    ) {}
    /*  Query SQL Get All Transaksi
        transaksiList =
        SELECT
            *
        FROM
            transaksi
            LEFT JOIN user ON penerbit.id_user = user.id_user
            LEFT JOIN buku ON penerbit.id_buku = buku.id_buku

        return transaksiList
    */
    async get(): Promise<Transaksi[]> {
        const transaksi = await Transaksi.find({
            relations: { buku: true, user: true }
        });

        return transaksi;
    }

    /* Query SQL Create Transaksi
        INSERT INTO TABLE transaksi VALUES(body.jumlah_buku, body.total,
                body.status_transaksi, body.dateNow, body.id_buku, body.id_user)
    */
    async createTransaksi(dto: CreateTransaksiDTO, userId: number) {
        await this.userService.getProfile(userId);
        await this.bukuService.getBook(dto.bukuId);

        const transaksi = Transaksi.create({ ...dto });
        await Transaksi.save(transaksi);
    }

    /*  Query SQL Get All Transaksi
        transaksiList =
        SELECT
            *
        FROM
            transaksi
            LEFT JOIN user ON penerbit.id_user = user.id_user
            LEFT JOIN buku ON penerbit.id_buku = buku.id_buku
        WHERE transaksi.id_transaksi = body.id_transaksi

        return transaksiList
    */
    async getTransaksi(transaksiId: number): Promise<Transaksi> {
        const transaksi = await Transaksi.findOneBy({ transaksiId });

        if (!transaksi) {
            throw Errors.TRANSAKSI_NOT_FOUND;
        }

        return transaksi;
    }

    /*  Query SQL Bayar Transaksi
        START TRANSACTION;
            newSaldo = saldo sekarang - jumlah harga transaksi;
            UPDATE user
            SET
                saldo = newSaldo
            WHERE
                id_user = body.userId;

            newStok = stok sekarang - jumlah buku yang dibeli;
            UPDATE buku
            SET
                stok = newStok
            WHERE
                id_buku = body.bukuId;

            UPDATE transaksi
            SET
                status_transaksi = 1
            WHERE id_transaksi = body.transaksiId;

        COMMIT;
    */
    async bayarTransaksi(dto: BayarTransaksiDTO, userId: number) {
        const user = (await this.userService.getProfile(userId)) as User;
        const book = await this.bukuService.getBook(dto.bukuId);

        const stokBaru = book.stok - dto.jumlahBuku;

        if (stokBaru < 0) {
            throw Errors.NOT_ENOUGH_STOCK;
        }

        book.stok = stokBaru;

        const newSaldo = Number(user.saldo) - dto.jumlahBuku * book.harga;

        if (newSaldo < 0) {
            throw Errors.NOT_ENOUGH_FUND;
        }

        user.saldo = newSaldo;

        const queryRunner = appDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await user.save();
            await book.save();

            const transaksi = await this.getTransaksi(dto.transaksiId);
            transaksi.statusTransaksi = 1;

            await transaksi.save();
        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    /*  Query SQL Edit Transaksi
        UPDATE transaksi
        SET
            status_transaksi = body.statusTransaksi
        WHERE
            id_transaksi = body.idTransaksi
    */
    async editTransaksi(dto: EditTransaksiDTO, userId: number) {
        const isAdmin = await this.userService.isAdmin(userId);

        if (!isAdmin) {
            throw Errors.NO_PERMISSION;
        }

        const transaksi = await this.getTransaksi(dto.transaksiId);

        if (!transaksi) {
            throw Errors.TRANSAKSI_NOT_FOUND;
        }

        transaksi.statusTransaksi = dto.statusTransaksi;

        await transaksi.save();
    }
}
