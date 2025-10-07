import { body } from 'express-validator';

export const createPostValidator = [
    body('title')
        .notEmpty()
        .withMessage('title cannot be empty')
        .isString()
        .withMessage('title must be string')
        .isLength({ max: 100 })
        .withMessage('title must be less than 100 characters'),

    body('content')
        .notEmpty()
        .withMessage('content cannot be null')
        .isString()
        .withMessage('content must be string'),

    body('authorId')
        .notEmpty()
        .withMessage('author id cannot be empty')
        .isInt()
        .withMessage('author id must be integer'),
];
