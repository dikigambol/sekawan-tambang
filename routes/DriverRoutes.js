import express from 'express';
import { createDriver, deleteDriver, getDriver, getDriverById, updateDriver } from '../controllers/DriverController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/driver', getDriver);
router.get('/driver/:id', getDriverById);
router.post('/driver', isAuth, createDriver);
router.patch('/driver/:id', isAuth, updateDriver);
router.delete('/driver/:id', isAuth, deleteDriver);

export default router;