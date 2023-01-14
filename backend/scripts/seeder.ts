// * max-len isn't needed here
// * This script is very dependant on the project files

/* eslint-disable max-len */

import logger from '../src/utils/logger.util';

import { appDataSource } from '../src/database/datasource';
import { authService } from '../src/services/auth.service';
import { User } from '../src/database/entities/user.entity';
import { Todo } from '../src/database/entities/todo.entity';
import { DateTime } from 'luxon';

// -------------------------------------------------------------------- //

const DEFAULT_PHONE = '628174991828';

async function insertData() {
    const { hashPassword } = authService;

    const users: User[] = [
        User.create({
            fullName: 'John Doe',
            email: 'john_doe@example.com',
            phone: DEFAULT_PHONE,
            password: await hashPassword('JohnDoe123?')
        }),
        User.create({
            fullName: 'Alvian',
            email: 'alvian@example.com',
            phone: DEFAULT_PHONE,
            password: await hashPassword('Alvian123?')
        })
    ];
    await User.save(users);

    const todos: Todo[] = [
        Todo.create({
            user: users[0],
            content: 'Play VALORANT tonight'
        }),
        Todo.create({
            user: users[1],
            content: 'Do android mobile homework',
            track: {
                updatedAt: DateTime.utc().minus({ days: 2, hours: 6 }),
                createdAt: DateTime.utc().minus({ days: 3 })
            }
        })
    ];
    await Todo.save(todos);

    return { users, todos };
}

// -------------------------------------------------------------------- //

appDataSource.initialize()
    .then(async () => {
        await insertData();

        logger.debug('Data seeding has finished!');
        process.exit();
    })
    .catch((err: Error) => logger.error(`${err} ${err.stack}`));