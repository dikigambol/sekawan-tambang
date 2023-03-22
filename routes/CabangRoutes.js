import express from 'express';
import { createCabang, deleteCabang, getCabang, getCabangById, updateCabang } from '../controllers/CabangController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/cabang', getCabang);
router.get('/cabang/:id', getCabangById);
router.post('/cabang', isAuth, createCabang);
router.patch('/cabang/:id', isAuth, updateCabang);
router.delete('/cabang/:id', isAuth, deleteCabang);

export default router;