import express from 'express';
import { countDashboard, signIn } from '../controllers/AuthController.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser, getUsersByTambang } from '../controllers/UserController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', isAuth, createUser);
router.patch('/users/:id', isAuth, updateUser);
router.delete('/users/:id', isAuth, deleteUser);
router.get('/optionuser/:id', getUsersByTambang);

// auth 
router.post('/signin', signIn);
router.get('/dash', countDashboard);

export default router;