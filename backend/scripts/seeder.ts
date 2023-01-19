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
