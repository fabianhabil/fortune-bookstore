import logger from '../utils/logger.util';

import { Service } from 'typedi';
import { HttpError, Middleware } from 'routing-controllers';
import { StatusCodes } from 'http-status-codes';
import {
    ResponseError,
    sendResponse, Errors,
} from '../utils/api.util';

import type { Request, Response } from 'express';
import type { ExpressErrorMiddlewareInterface } from 'routing-controllers';

@Service()
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {

    error(error: Error, _: Request, res: Response) {
        let customError;

        if (error.name === ResponseError.name) {
            customError = error as ResponseError;
        } else if (error instanceof HttpError) {
            const { message } = error;
            // if (error.errors?.length) {
            //     const { constraints } = error.errors[0];
            //     message = Object.values(constraints!)[0];
            // }
            customError = new ResponseError(
                message,
                error.httpCode,
            );
        } else {
            customError = Errors.SERVER;
            customError.stack = error.stack;
        }

        if (customError.statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
            logger.error(`${error}\n${error.stack}`);
        }

        return sendResponse(res, ResponseError.toResponse(customError));
    }

}