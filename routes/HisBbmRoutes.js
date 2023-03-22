import express from 'express';
import { createBBM, deleteBBM, getBBM, updateBBM } from '../controllers/HisBbmController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/bbm/:id', getBBM);
router.post('/bbm', isAuth, createBBM);
router.patch('/bbm/:id', isAuth, updateBBM);
router.delete('/bbm/:id', isAuth, deleteBBM);

export default router;