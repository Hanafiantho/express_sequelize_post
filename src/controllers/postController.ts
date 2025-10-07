import { Request, Response } from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { errorResponse, successResponse } from '../utils/response';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.query;
        const where: any = {};

        // find posts by author id
        if (authorId) {
            where.authorId = authorId;
        }

        const posts = await Post.findAll({
            where,
            attributes: { exclude: ['authorId'] }, // exlude field authorId
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'name', 'email', 'phone'], // only shows id, name, email and phone fields
                },
            ],
        });

        res.status(200).json(successResponse(posts));
    } catch (err) {
        res.status(500).json(errorResponse(err));
    }
};

export const getPostByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);

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
