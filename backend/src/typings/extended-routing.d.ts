import type { ValidationError } from 'class-validator';

declare module 'routing-controllers' {

    declare class HttpError {

        httpCode: number;

        /**
         * Error that occurs because the validation failed.
         */
        errors?: ValidationError[];

    }

}