import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { userId, page = '1', limit = '10' } = req.query;
        const where: any = {};

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const offset = (pageNum - 1) * limitNum; // for how many records to skip before return results

        // find posts by author id
        if (userId) {
            where.authorId = userId;
        }

        const { rows: posts, count: total } = await Post.findAndCountAll({
            where,
            attributes: { exclude: ['authorId'] }, // exlude field authorId
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name', 'email', 'phone'], // only shows id, name, email and phone fields
                },
                {
                    model: Comment,
                    as: 'comments',
                },
            ],
            limit: limitNum,
            offset,
        });

        const totalPages = Math.ceil(total / limitNum);

        res.status(200).json(
            successResponse({
                data: posts,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages,
                },
            }),
        );
    } catch (err) {
        res.status(500).json(errorResponse(err));
    }
};

export const getPostByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name', 'email', 'phone'],
                },
                {
                    model: Comment,
                    as: 'comments',
                },
            ],
        });

        res.status(200).json(successResponse(post));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, authorId, isArchived } = req.body;

        const post = await Post.create({
            title,
            content,
            authorId,
            isArchived,
        });

        res.status(201).json(successResponse(post));
    } catch (error) {
        res.status(500).json(errorResponse(error));
    }
};
