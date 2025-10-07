import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const getComments = async (req: Request, res: Response) => {
    try {
        const { userId, postId } = req.query;
        const where: any = {};

        // find comments by user id
        if (userId) {
            where.userId = userId;
        }

        // find comments by post id
        if (postId) {
            where.postId = postId;
        }

        const comments = await Comment.findAll({
            where,
            include: [
                { model: User, as: 'user', attributes: ['id', 'name'] },
                { model: Post, as: 'post' },
            ],
        });

        res.status(200).json(successResponse(comments));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const { comment, userId, postId } = req.body;

        const createdComment = await Comment.create({
            comment,
            userId,
            postId,
        });

        res.status(201).json(successResponse(createdComment));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};
