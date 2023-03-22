import express from 'express';
import { createReservasi, deleteReservasi, getReservasi, getReservasiById, updateReservasi } from '../controllers/ReservasiController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/reservasi', getReservasi);
router.get('/reservasi/:id', getReservasiById);
router.post('/reservasi', isAuth, createReservasi);
router.patch('/reservasi/:id', isAuth, updateReservasi);
router.delete('/reservasi/:id', isAuth, deleteReservasi);

export default router;