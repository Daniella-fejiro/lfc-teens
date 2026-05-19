import express from "express";
import { getBirthdays } from "../controllers/birthdayController.js";

const router = express();

router.get('/', getBirthdays )

export default router;