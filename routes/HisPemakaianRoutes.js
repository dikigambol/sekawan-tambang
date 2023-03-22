import express from 'express';
import { createPemakaian, deletePemakaian, getPemakaian, updatePemakaian } from '../controllers/HisPemakaianController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/pemakaian/:id', getPemakaian);
router.post('/pemakaian', isAuth, createPemakaian);
router.patch('/pemakaian/:id', isAuth, updatePemakaian);
router.delete('/pemakaian/:id', isAuth, deletePemakaian);

export default router;