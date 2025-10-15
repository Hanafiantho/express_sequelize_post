import { Router } from 'express';
import { changePassword, login } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { changePasswordValidator, loginValidator } from '../validators/authValidator';

const router = Router();

router.post('/login', loginValidator, validate, login);
router.put('/change-password/:id', changePasswordValidator, validate, changePassword);

export default router;
