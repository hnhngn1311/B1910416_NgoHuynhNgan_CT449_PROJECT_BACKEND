
import express from 'express';
import { deteleTerm, insertFromJson, insertTerm, listAllTerm, updateTerm } from '../controllers/term.controller.js';

const router = express.Router()
router.route("/").get(listAllTerm).post(insertTerm)
router.route("/:id").put(updateTerm).delete(deteleTerm)
router.route("/insert-from-json").post(insertFromJson)
export default router;
