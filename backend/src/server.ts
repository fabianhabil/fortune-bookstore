import app from './app';
import logger from './utils/logger.util';

import { appDataSource } from './database/datasource';

const port = process.env.PORT ?? 5000;

app.listen(port, async () => {
    await appDataSource.initialize();

    logger.info(`Server is hosted at http://localhost:${port}/`);
});