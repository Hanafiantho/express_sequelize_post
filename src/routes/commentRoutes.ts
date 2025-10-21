import { Router } from 'express';
import { createComment, getComments } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { createCommentValidator } from '../validators/commentValidator';

const router = Router();

router.get('/', authenticate, getComments);

router.post('/', authenticate, createCommentValidator, validate, createComment);

export default router;
