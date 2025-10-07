import { Router } from 'express';
import { createPost, getPostByID, getPosts } from '../controllers/postController';
import { validate } from '../middleware/validate';
import { createPostValidator } from '../validators/postValidator';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getPostByID);

router.post('/', createPostValidator, validate, createPost);

export default router;
