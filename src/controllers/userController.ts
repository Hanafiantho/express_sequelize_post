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
        const { name, email, phone } = req.body;
        const user = await User.create({ name, email, phone });

        res.status(201).json(successResponse(user));
    } catch (err) {
        res.status(500).json(errorResponse(err));
    }
};
