import {
    executeCommand,

    DATASOURCE_PATH,
    MIGRATIONS_DIR_PATH,
    ORM_CMD
} from '.';

const args = process.argv.slice(2);
if (!args.length) {
    throw Error('Invalid sub-command');
}

const subcmd = args.shift();
let command = '';

switch (subcmd) {
    case 'CREATE':
        if (!args.length) {
            throw Error('Migration name is required!');
        }
        command = `migration:create ${MIGRATIONS_DIR_PATH}/${args[0]}`;
        break;
    case 'GENERATE':
        if (!args.length) {
            throw Error('Migration name is required!');
        }
        command = `migration:generate -d ${DATASOURCE_PATH} ${MIGRATIONS_DIR_PATH}/${args[0]}`;
        break;
    case 'SHOW':
        command = `migration:show -d ${DATASOURCE_PATH}`;
        break;
    case 'RUN':
        command = `migration:run -d ${DATASOURCE_PATH}`;
        break;
    case 'REVERT':
        command = `migration:revert -d ${DATASOURCE_PATH}`;
        break;
    default:
        throw Error('Invalid sub-command');
}

executeCommand(`${ORM_CMD} ${command}`);