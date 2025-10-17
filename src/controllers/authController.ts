import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json(errorResponse(null, 'Invalid email'));
        }

        // check password
        const isValidPassword = await user.validPassword(password);

        if (!isValidPassword) {
            return res.status(401).json(errorResponse(null, 'Invalid password'));
        }

        // create token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h',
            },
        );

        const { password: _, ...userData } = user.toJSON();

        res.status(200).json(
            successResponse({
                user: userData,
                token,
            }),
        );
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        // 1. validate id
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json(errorResponse(null, 'Invalid user id'));
        }

        // 2. validate old password
        const isValidOldPassword = await user.validPassword(oldPassword);

        if (!isValidOldPassword) {
            return res.status(400).json(errorResponse(null, 'Invalid old password'));
        }

        user.password = newPassword;
        await user.save();
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};
