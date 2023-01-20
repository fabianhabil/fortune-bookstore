import { BahasaBuku, Buku } from './../src/database/entities/buku.entity';
import { KategoriBuku } from './../src/database/entities/kategori-buku.entity';
import { Penerbit } from './../src/database/entities/penerbit.entity';
// * max-len isn't needed here
// * This script is very dependant on the project files
/* eslint-disable max-len */

import logger from '../src/utils/logger.util';

import { appDataSource } from '../src/database/datasource';
import { AuthService } from '../src/services/auth.service';
import { faker } from '@faker-js/faker';
import { User, UserRole } from '../src/database/entities/user.entity';

// -------------------------------------------------------------------- //

const DEFAULT_PHONE_FORMAT = '+62 ### #### ####';
const AUTH_SERVICE = new AuthService();

async function insertData() {
    const { hashPassword } = AUTH_SERVICE;

    const users: User[] = [
        User.create({
            name: 'Super Admin',
            email: 'admin@admin.com',
            password: await hashPassword('123'),
            alamat: '-',
            tglLahir: new Date('2003-03-03'),
            phone: '-',
            role: UserRole.ADMIN
        }),
        User.create({
            name: 'Fabian Habil',
            email: 'fabian@gmail.com',
            password: await hashPassword('123'),
            alamat: 'Bandung',
            tglLahir: new Date('2003-03-27'),
            phone: faker.phone.number(DEFAULT_PHONE_FORMAT),
            role: UserRole.USER
        })
    ];
    await User.save(users);

    const penerbit: Penerbit[] = [
        Penerbit.create({
            penerbitId: 'test-penerbit-1',
            nama: 'penerbit 1'
        }),

        Penerbit.create({
            penerbitId: 'test-penerbit-2',
            nama: 'penerbit 2'
        })
    ];

    await Penerbit.save(penerbit);

    const kategori: KategoriBuku[] = [
        KategoriBuku.create({ nama: 'Komik' }),
        KategoriBuku.create({ nama: 'Novel' })
    ];

    await KategoriBuku.save(kategori);

    const buku: Buku[] = [
        Buku.create({
            name: 'Buku 1',
            deskripsi: 'Ini Buku 1',
            harga: 50000,
            stok: 10,
            jumlahHalaman: 233,
            tanggalTerbit: new Date('2022-03-02'),
            bahasa: BahasaBuku['BAHASA INDONESIA'],
            berat: 0.33,
            lebar: 9.22,
            panjang: 9.22,
            penerbitId: 'test-penerbit-1',
            kategoriBukuId: 1
        }),
        Buku.create({
            name: 'Buku 2',
            deskripsi: 'Ini Buku 2',
            harga: 65000,
            stok: 27,
            jumlahHalaman: 123,
            tanggalTerbit: new Date('2022-03-10'),
            bahasa: BahasaBuku['BAHASA INDONESIA'],
            berat: 0.33,
            lebar: 9.22,
            panjang: 9.22,
            penerbitId: 'test-penerbit-1',
            kategoriBukuId: 2
        })
    ];

    await Buku.save(buku);
}

// -------------------------------------------------------------------- //

appDataSource
    .initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));
