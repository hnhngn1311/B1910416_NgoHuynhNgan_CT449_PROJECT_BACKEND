
import express from 'express';
import { insertFromJson, signIn } from '../controllers/account.controllers.js';

const router = express.Router()
router.route("/").post(signIn)
router.route("/insert-json-format").post(insertFromJson)
export default router;
