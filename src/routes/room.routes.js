
import express from 'express';
import { deleteRoom, insertFromJson, insertRoom, listAllRoom, updateRoom } from '../controllers/room.controllers.js';

const router = express.Router()
router.route("/").get(listAllRoom).post(insertRoom)
router.route("/:id").put(updateRoom).delete(deleteRoom)
router.route("/insert-from-json").post(insertFromJson)
export default router;
