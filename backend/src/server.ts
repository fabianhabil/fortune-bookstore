import app from './app';
import errorHandling from './middlewares/error-handler.middleware';
import logger from './utils/logger.util';

import { appDataSource } from './database/datasource';
import { createExpressRouter } from './internals/routes';

const port = process.env.PORT ?? 5000;

app.listen(port, async () => {
    const expressRouter = await createExpressRouter();

    app.use('/', expressRouter);
    app.use(errorHandling);

    await appDataSource.initialize();

    console.log();
    logger.info(`Server is hosted at http://localhost:${port}/`);
});