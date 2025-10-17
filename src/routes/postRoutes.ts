import { Router } from 'express';
import { createPost, getPostByID, getPosts } from '../controllers/postController';
import { authenticate } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { createPostValidator } from '../validators/postValidator';

const router = Router();

router.get('/', authenticate, getPosts);

router.get('/:id', getPostByID);

router.post('/', createPostValidator, validate, createPost);

export default router;
