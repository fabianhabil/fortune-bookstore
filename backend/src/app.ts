import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import handleLogging from './middlewares/logger.middleware';
import config from './configs/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const app = express();

// global middlewares
app.use(compression());
app.use(helmet());
app.use(cors(config.cors));
app.use(cookieParser());
app.use(express.json());
app.use(handleLogging);

export default app;