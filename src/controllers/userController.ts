import { Request, Response } from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ include: [{ model: Post, as: 'posts' }] });

        res.status(200).json(successResponse(users));
    } catch (err) {
        res.status(500).json(errorResponse(err));
    }
};

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, { include: [{ model: Post, as: 'posts' }] });
        res.status(200).json(successResponse(user));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);

        const { password, ...userData } = user.toJSON();

        res.status(201).json(successResponse(userData));
    } catch (err) {
        res.status(500).json(errorResponse(err));
    }
};

export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // get user by id
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json(errorResponse(null, 'user not found'));
        }

        Object.keys(updates).forEach((key) => {
            (user as any)[key] = updates[key];
        });
        await user.save();

        const { password, ...userData } = user.toJSON();

        res.status(200).json(successResponse(userData));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};
