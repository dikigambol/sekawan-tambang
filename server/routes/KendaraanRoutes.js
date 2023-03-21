import express from 'express';
import { createKendaraan, deleteKendaraan, getKendaraan, getKendaraanById, updateKendaraan } from '../controllers/KendaraanController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/kendaraan', getKendaraan);
router.get('/kendaraan/:id', getKendaraanById);
router.post('/kendaraan', isAuth, createKendaraan);
router.patch('/kendaraan/:id', isAuth, updateKendaraan);
router.delete('/kendaraan/:id', isAuth, deleteKendaraan);

export default router;