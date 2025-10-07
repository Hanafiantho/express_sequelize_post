import { body } from 'express-validator';

export const createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('name cannot be empty')
        .isString()
        .withMessage('name must be string')
        .isLength({ max: 100 })
        .withMessage('name must be less than 100 character'),

    body('email')
        .notEmpty()
        .withMessage('email cannot be empty')
        .isEmail()
        .withMessage('invalid email address'),

    body('phone')
        .notEmpty()
        .withMessage('phone cannot be empty')
        .custom((value) => {
            if (/^(0|\+62)/.test(value)) {
                throw new Error('Phone number cannot start with 0 or +62');
            }
            return true;
        }),
];
