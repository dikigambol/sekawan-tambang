import express from 'express';
import { createServis, deleteServis, getServis, updateServis } from '../controllers/HisServisController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/servis/:id', getServis);
router.post('/servis', isAuth, createServis);
router.patch('/servis/:id', isAuth, updateServis);
router.delete('/servis/:id', isAuth, deleteServis);

export default router;