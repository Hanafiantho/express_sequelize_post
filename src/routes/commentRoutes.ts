import { Router } from 'express';
import { createComment, getComments } from '../controllers/commentController';
import { validate } from '../middleware/validate';
import { createCommentValidator } from '../validators/commentValidator';

const router = Router();

router.get('/', getComments);

router.post('/', createCommentValidator, validate, createComment);

export default router;
