import express from 'express';
import { createPSewa, deletePSewa, getPSewa, getPSewaById, updatePSewa } from '../controllers/PsewaController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/psewa', getPSewa);
router.get('/psewa/:id', getPSewaById);
router.post('/psewa', isAuth, createPSewa);
router.patch('/psewa/:id', isAuth, updatePSewa);
router.delete('/psewa/:id', isAuth, deletePSewa);

export default router;