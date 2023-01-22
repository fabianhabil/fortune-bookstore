import { StatusCodes } from 'http-status-codes';
import type { Response } from 'express';

export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export interface APIResponse {
    statusCode?: StatusCodes;
    success?: boolean;
    message: string;
    data?: unknown;
}

/**
 * Sends a JSON response with standardization.
 * Normally, there aren't any template to send responses,
 * so you don't get the help from the autocomplete.
 */
export function sendResponse(res: Response, params: APIResponse) {
    const { statusCode, success, ...newParams } = params;

    const isSuccess = success ?? true;
    const code = statusCode ?? StatusCodes.OK;

    const response = {
        status: isSuccess ? 'success' : 'fail',
        ...newParams
    };

    return res.status(code).json(response);
}
export class ResponseError extends Error {
    statusCode: StatusCodes;

    constructor(message: string, statusCode?: StatusCodes) {
        super(message);

        // Apparently using `instanceof` syntax doesn't work
        // when it comes to the `Error` class.
        //
        // So, to make it up for that, as an identifier we just do this.
        this.name = ResponseError.name;
        this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    }

    static toResponse(error: ResponseError): APIResponse {
        return {
            statusCode: error.statusCode,
            success: false,
            message: error.message
        };
    }
}

/**
 * Common API errors
 */
export const Errors = {
    /**
     * Internal server error / Unexpected error
     */
    SERVER: new ResponseError('Unexpected server error'),

    /**
     * User doesn't have JWT or authentication token
     */
    NO_SESSION: new ResponseError(
        "You don't have an account session",
        StatusCodes.UNAUTHORIZED
    ),

    /**
     * User doesn't have the permission
     */
    NO_PERMISSION: new ResponseError(
        "You don't have the permission to access this content",
        StatusCodes.FORBIDDEN
    ),

    BOOK_NOT_FOUND: new ResponseError('Book not found', StatusCodes.NOT_FOUND),

    USER_NOT_FOUND: new ResponseError('User not found', StatusCodes.NOT_FOUND),

    NOT_ENOUGH_FUND: new ResponseError(
        'Not Enough Fund',
        StatusCodes.BAD_REQUEST
    ),

    NOT_ENOUGH_STOCK: new ResponseError(
        'This book doesnt have enough stok!',
        StatusCodes.BAD_REQUEST
    ),

    TRANSAKSI_NOT_FOUND: new ResponseError(
        'Transaksi not found',
        StatusCodes.NOT_FOUND
    ),

    UNSUPPORTED_IMAGE_TYPE: new ResponseError(
        'Unsupported Image Type',
        StatusCodes.BAD_REQUEST
    )
};
