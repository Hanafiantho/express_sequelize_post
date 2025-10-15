import { Router } from 'express';
import { createUser, editUser, getUserByID, getUsers } from '../controllers/userController';
import { validate } from '../middleware/validate';
import { createUserValidator } from '../validators/userValidator';

const router = Router();

// get all users route
router.get('/', getUsers);

// get user by id
router.get('/:id', getUserByID);

// create user route
router.post('/', createUserValidator, validate, createUser);

// edit user route
router.put('/:id', editUser);

export default router;
