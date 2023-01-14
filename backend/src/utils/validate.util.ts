import { StatusCodes } from 'http-status-codes';
import { ResponseError } from './api.util';

import type { Request } from 'express';
import type { ObjectSchema } from 'joi';

const { BAD_REQUEST } = StatusCodes;
type ValidationType = 'params' | 'query' | 'body';

/**
 * Utility to validate the express {@link Request}.
 * It selects from the {@link ValidationType} and uses the `joi`
 * to validate it.
 *
 * @param schema the `joi` schema stored in `./validations` dir.
 * @param type which part of the `req` to be selected for validation.
 * @returns the object matching the `schema`.
 * @throws {@link BAD_REQUEST} if the object doesn't match the validation.
 */
export function validate<T>(
    req: Request,
    schema: ObjectSchema<T>,
    type: ValidationType = 'body') {

    const content = req[type];
    const { value, error } = schema.validate(content);

    if (error) {
        throw new ResponseError(error.message, BAD_REQUEST);
    }

    return value;
}