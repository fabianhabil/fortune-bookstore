import joi from 'joi';

export interface NewTodoType {
    content: string;
}

export interface UpdateTodoType {
    content?: string;
    isDone?: boolean;
}

export interface TodoIdType {
    todoId: number;
}

export const newTodoSchema = joi.object<NewTodoType>({
    content: joi.string()
        .min(5)
        .max(512)
        .required(),
});

export const updateTodoSchema = joi.object<UpdateTodoType>({
    content: joi.string()
        .min(5)
        .max(512),
    isDone: joi.boolean(),
});

export const todoIdSchema = joi.object<TodoIdType>({
    todoId: joi.number()
        .min(0)
        .required(),
});