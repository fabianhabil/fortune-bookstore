import authenticate from '../../middlewares/authenticate.middleware';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/api.util';
import { todoService } from '../../services/todo.service';

import {
    Controller,
    ReqHandler,
} from '../../internals/decorators/express.decorator';

import {
    newTodoSchema,
    updateTodoSchema,
    todoIdSchema,
} from '../../validations/todo.validation';

import { validate } from '../../utils/validate.util';

@Controller({ path: 'todos', middlewares: [authenticate()] })
export class TodoController {

    @ReqHandler('GET', '/')
    async getAll(req: Request, res: Response) {
        const { id: userId } = req.userPayload!;
        const todos = await todoService.getAll(userId);

        return sendResponse(res, {
            message: 'Successfully found todos',
            data: { todos },
        });
    }

    @ReqHandler('POST', '/')
    async add(req: Request, res: Response) {
        const { content } = validate(req, newTodoSchema);
        const { id: userId } = req.userPayload!;

        const todoId = await todoService.add(userId, content);

        return sendResponse(res, {
            message: 'Successfully added new todo',
            statusCode: StatusCodes.CREATED,
            data: { todoId },
        });
    }

    @ReqHandler('GET', '/:todoId')
    async getById(req: Request, res: Response) {
        const { todoId } = validate(req, todoIdSchema, 'params');
        const { id: userId } = req.userPayload!;

        const todo = await todoService.get(userId, todoId);

        return sendResponse(res, {
            message: 'Successfully found todo',
            data: { todo },
        });
    }

    @ReqHandler('DELETE', '/:todoId')
    async delete(req: Request, res: Response) {
        const { todoId } = validate(req, todoIdSchema, 'params');
        const { id: userId } = req.userPayload!;

        await todoService.delete(userId, todoId);

        return sendResponse(res, { message: 'Successfully deleted a todo' });
    }

    @ReqHandler('PATCH', '/:todoId')
    async update(req: Request, res: Response) {
        const { todoId } = validate(req, todoIdSchema, 'params');
        const { content, isDone } = validate(req, updateTodoSchema);
        const { id: userId } = req.userPayload!;

        await todoService.update(userId, todoId, content, isDone);

        return sendResponse(res, { message: 'Successfully updated todo' });
    }

}