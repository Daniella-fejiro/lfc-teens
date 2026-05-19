import express from 'express';
import { createWorker, getWorkers, getWorker, updateWorker, deleteWorker } from '../controllers/workerController.js';

const router =express();

router.post('/create', createWorker);

router.get('/', getWorkers)

router.get('/:id', getWorker)

router.put("/:id", updateWorker)

router.delete("/:id", deleteWorker)

export default router;