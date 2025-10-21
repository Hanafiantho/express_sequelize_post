import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const getComments = async (req: Request, res: Response) => {
    try {
        const { userId, postId, page = '1', limit = '10' } = req.query;
        const where: any = {};

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const offset = (pageNum - 1) * limitNum;

        // find comments by user id
        if (userId) {
            where.userId = userId;
        }

        // find comments by post id
        if (postId) {
            where.postId = postId;
        }

        const { rows: comments, count: total } = await Comment.findAndCountAll({
            where,
            include: [
                { model: User, as: 'user', attributes: ['id', 'name'] },
                { model: Post, as: 'post' },
            ],
            offset,
            limit: limitNum,
        });

        const totalPages = Math.ceil(total / limitNum);

        res.status(200).json(
            successResponse({
                data: comments,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages,
                },
            }),
        );
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
