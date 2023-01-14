import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../utils/api.util';
import { Todo } from '../database/entities/todo.entity';
import { User } from '../database/entities/user.entity';

import type { FindManyOptions, FindOneOptions } from 'typeorm';

const TodoNotFoundError = new ResponseError(
    'Cannot find todo',
    StatusCodes.NOT_FOUND);

class TodoService {

    private createFindOption(
        userId: number,
        todoId?: number): FindOneOptions<Todo> | FindManyOptions<Todo> {

        return {
            where: {
                id: todoId,
                userId,
            },
            relations: {
                user: true,
            },
        };
    }

    async add(userId: number, content: string) {
        const user = (await User.findOneBy({ id: userId }))!;
        const todo = Todo.create({ content, user });

        await todo.save();

        return todo.id;
    }

    async update(
        userId: number, todoId: number,
        content?: string, isDone?: boolean) {

        const findOptions = this.createFindOption(userId, todoId);
        const todo = await Todo.findOne(findOptions);

        if (!todo) {
            throw TodoNotFoundError;
        }

        todo.content = content ?? todo.content;
        todo.isDone = isDone ?? todo.isDone;

        await todo.save();
    }

    async delete(userId: number, todoId: number) {
        const findOptions = this.createFindOption(userId, todoId);
        const todo = await Todo.findOne(findOptions);

        if (!todo) {
            throw TodoNotFoundError;
        }

        await todo.softRemove();
    }

    async get(userId: number, todoId: number) {
        const findOptions = this.createFindOption(userId, todoId);
        const todo = await Todo.findOne(findOptions);

        if (!todo) {
            throw TodoNotFoundError;
        }

        return todo;
    }

    async getAll(userId: number) {
        const findOptions = this.createFindOption(userId);
        return Todo.find(findOptions);
    }

}

export const todoService = new TodoService();