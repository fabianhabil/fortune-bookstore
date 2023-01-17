import 'reflect-metadata';
import config from '../configs/config';

import { DataSource } from 'typeorm';

type ORMPathType = 'entities' | 'migrations' | 'subscribers';

/**
 * Provides the path to the specific ORM directories
 *
 * With this we can generate all ORM directories path
 * for either development or production environment.
 *
 * For development environment:
 * * It accepts from the `src` folder and searches for `.ts` files
 *
 * For production environment:
 * * It accepts from the `build` folder and searches for `.js` files
 */
function pathToLoadORM(type: ORMPathType) {
    const startDir = config.isDev ? 'src' : 'build';

    let middleExt: string;
    const lastExt = config.isDev ? 'ts' : 'js';

    switch (type) {
        case 'entities':
            middleExt = '.entity';
            break;
        case 'migrations':
            middleExt = '';
            break;
        case 'subscribers':
            middleExt = '.subscriber';
            break;
    }

    return `${startDir}/database/${type}/**/*${middleExt}.${lastExt}`;
}

export const appDataSource = new DataSource({
    type: 'mysql',
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,

    // This'll automatically modify the tables as soon as the server starts
    // therefore, it's very bad for production
    synchronize: config.isDev,
    migrationsRun: true,

    entities: [pathToLoadORM('entities')],
    migrations: [pathToLoadORM('migrations')],
    subscribers: [pathToLoadORM('subscribers')]
});
