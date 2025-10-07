import { body } from 'express-validator';

export const createCommentValidator = [
    body('comment')
        .notEmpty()
        .withMessage('comment cannot be empty')
        .isString()
        .withMessage('comment must be string'),

    body('userId')
        .notEmpty()
        .withMessage('user id cannot be empty')
        .isInt()
        .withMessage('user id must be integer'),

    body('postId')
        .notEmpty()
        .withMessage('post id cannot be empty')
        .isInt()
        .withMessage('post id must be integer'),
];
