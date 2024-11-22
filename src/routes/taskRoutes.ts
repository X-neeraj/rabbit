// import { express } from 'express';
import express from 'express';
import { submitTask } from '../controller/taskController';

const router = express.Router();

router.post("/task",submitTask)

export default router;
