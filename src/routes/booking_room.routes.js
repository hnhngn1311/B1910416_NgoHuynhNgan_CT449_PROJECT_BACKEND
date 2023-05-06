
import express from 'express';
import { deleteBookingRoom, filterBookingRoom, getBookingRoomName, getRoomBooking, insertBookingRoom, insertFromJson, listAllBookingRoom, updateBookingRoom } from '../controllers/booking_room.controller.js';

const router = express.Router()
router.route("/").get(listAllBookingRoom).post(insertBookingRoom)
router.route("/:id").put(updateBookingRoom).delete(deleteBookingRoom)
router.route("/get-rooms").get(getBookingRoomName).post(filterBookingRoom)
router.route('/get-rooms-booking').get(getRoomBooking)
router.route("/insert-from-json").post(insertFromJson)
export default router;
