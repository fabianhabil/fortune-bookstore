/* eslint-disable @typescript-eslint/no-unused-vars */

import type authenticate from '../middlewares/authenticate.middleware';
import type { UserPayload } from './auth';

declare module 'express' {

    // extends the `Request` interface from express to have custom properties.
    export interface Request {

        /**
         * User's authentication payload
         *
         * The value will remain `undefined` if the controller
         * doesn't use the {@link authenticate} middleware.
         *
         * With this we can easily grab the user's payload without
         * extra functions such as `getPayloadFromHeader`.
         */
        userPayload?: UserPayload;

    }

}