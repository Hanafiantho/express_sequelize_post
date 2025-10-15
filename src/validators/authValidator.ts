import { body } from 'express-validator';

export const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isEmail()
        .withMessage('invalid email address'),

    body('password')
        .notEmpty()
        .withMessage('password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters')
        .matches(/[A-Z]/)
        .withMessage('password must be contain at least one uppercase letter'),
];
