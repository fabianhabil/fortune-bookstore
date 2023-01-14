/***************************************************************************
 *                                WARNING                                  *
 ***************************************************************************
 ***                                                                     ***
 *  This file shouldn't be modified unless you know what you're doing.     *
 *  It contains the logic for controllers and handlers decorator to work.  *
 ***                                                                     ***
 ***************************************************************************/

import type {
    Request,
    Response,
    NextFunction,
    // ignore to allow linking on documentation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Router,
} from 'express';

/**
 * Allow function type for class constructors to use it
 * as a key for {@link RoutingMap}.
 *
 * With this we can avoid errors when using the same class names.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClassType = Function;

export type RequestMethods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * The best practice is not to use {@link Function} as your type.
 * But I have to, somehow, make a type that accepts it for the request handlers
 * and router method functions.
 */
export type HandlerFn = (req: Request, res: Response, next: NextFunction)
    => unknown | Promise<unknown>;

export type WrappedHandlerFn = (req: Request, res: Response, next: NextFunction)
    => Promise<unknown>

// ---------------------------------------------------- //

/**
 * Replicates the function to register a router
 * such as from {@link Router.get}.
 *
 * @see {@link ExpressRouter}
 */
export type RouterFn = (path: string, ...handlers: WrappedHandlerFn[]) => void;

/**
 * Inside {@link Router}, there are functions to register a request handler
 * such as {@link Router.get} and {@link Router.post}.
 *
 * But it's tricky to execute the function with {@link RequestMethods}.
 * Therefore, I'm forcing the module to accept a string to run the function
 * based on {@link RequestMethods}.
 */
export type ExpressRouter = Record<string, RouterFn>

// ---------------------------------------------------- //

/**
 * Stores the information from `Controller` decorator.
 */
export interface ControllerMeta {
    path: string;
    middlewares: HandlerFn[];
    /**
     * The class that holds the `Route` is stored here
     * so we can grab the functions (the `Controller`) within it.
     */
    instance: Record<string, HandlerFn>;
}

/**
 * Stores the information from `ReqHandler` decorator.
 */
export interface HandlerMeta {
    path: string;
    method: RequestMethods;
    /**
     * The function/method name for a specific `ReqHandler`,
     * which is used for executing the request handler upon being called.
     *
     * This is connected with the {@link ControllerMeta.instance}
     */
    fnName: string;
    middlewares: HandlerFn[];
}

// ---------------------------------------------------- //

export interface ControllerOptions {
    /**
     * The API major version, changing this for example to `2`
     * means that the API endpoint have a new big/major changes.
     * The major version is the same from {@link https://semver.org/}.
     *
     * From:
     * ```txt
     * POST /v1/todo/add
     * ```
     *
     * To:
     * ```txt
     * POST /v2/todos/add
     * ```
     *
     * @default 1
     */
    version?: number;
    /**
     * The request path that the controller accepts.
     *
     * Let's say the path value is `example`, then it will become: `/v1/example`
     */
    path: string;
    /**
     * The middlewares for this route.
     * It will be applied to all handlers within this route.
     *
     * @default []
     */
    middlewares?: HandlerFn[];
}