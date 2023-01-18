import { useExpressServer, useContainer } from 'routing-controllers';
// import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
// import handleLogging from './middlewares/logger.middleware';
import config from './configs/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { Container } from 'typedi';
import path from 'node:path';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthService } from './services/auth.service';
import { Errors } from './utils/api.util';
import type { Request } from 'express';

const app = express();

// global middlewares
app.use(compression());
app.use(helmet());
app.use(cookieParser());
useContainer(Container);

useExpressServer(app, {
    cors: config.cors,
    controllers: [path.join(__dirname, '/controllers/**/*.controller.{js,ts}')],
    middlewares: [ErrorMiddleware, LoggerMiddleware],
    defaultErrorHandler: false,
    validation: {
        forbidUnknownValues: true,
        stopAtFirstError: true
    },
    development: config.isDev,
    currentUserChecker: async (action) => {
        const req = action.request as Request;
        const service = Container.get(AuthService);
        const payload = await service.getUserPayload(req, 'access');
        if (!payload) {
            throw Errors.NO_SESSION;
        }
        return payload;
    }
});

// app.use(cors(config.cors));
// app.use(express.json());
// app.use(handleLogging);

export default app;
