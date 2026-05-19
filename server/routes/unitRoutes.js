import express from 'express';
import { getServiceUnitStats } from '../controllers/unitController.js';

const router = express()

router.get("/", getServiceUnitStats)

export default router;