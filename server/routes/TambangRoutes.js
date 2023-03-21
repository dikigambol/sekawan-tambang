import express from 'express';
import { createTambang, deleteTambang, getTambang, getTambangById, updateTambang } from '../controllers/TambangController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/tambang', getTambang);
router.get('/tambang/:id', getTambangById);
router.post('/tambang', isAuth, createTambang);
router.patch('/tambang/:id', isAuth, updateTambang);
router.delete('/tambang/:id', isAuth, deleteTambang);

export default router;