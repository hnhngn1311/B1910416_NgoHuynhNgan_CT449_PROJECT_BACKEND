
import express from 'express';
import { signIn } from '../controllers/account.controllers.js';

const router = express.Router()
router.route("/").post(signIn)
export default router;
