import morgan from 'morgan';
import logger from '../utils/logger.util';

import { Service } from 'typedi';
import { Middleware } from 'routing-controllers';

import type { NextFunction, Request, Response } from 'express';
import type { ExpressMiddlewareInterface } from 'routing-controllers';
import type { StreamOptions } from 'morgan';

@Service()
@Middleware({ type: 'after' })
export class LoggerMiddleware implements ExpressMiddlewareInterface {

    private readonly logFormat: string;
    private readonly streamOption: StreamOptions;

    constructor() {
        this.logFormat =
            '":method :url" :status - ' +
            ':response-time ms ":user-agent"';

        this.streamOption = {
            write(str) {
                logger.info(str.trim());
            },
        };

    }

    use(req: Request, res: Response, next: NextFunction) {
        const logging = morgan(this.logFormat, { stream: this.streamOption });
        return logging(req, res, next);
    }

}