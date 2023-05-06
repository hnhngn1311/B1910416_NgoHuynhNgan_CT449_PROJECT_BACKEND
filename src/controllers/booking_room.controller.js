import booking_room from '../models/bookingRoom.models.js';
import rooms from '../models/room.models.js';

export function listAllBookingRoom(req, res) {
    booking_room.find({}, (err, room_booking) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
        } else {
            res.send(room_booking);
        }
    });
}
export function insertFromJson(req, res) {
    const data = req.body;
    const room_insert = []
    booking_room.find({}, (err, rooms) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (rooms.some(e => e.name === element.name)) {
            } else {
                room_insert.push(element)
            }
        }
        booking_room.insertMany(room_insert)
            .then(() => res.send({ status: 200, message: "Success" }))
            .catch(err => res.send({ status: false, message: err.name }))
    })
}

export async function insertBookingRoom(req, res) {
    var data = req.body;
    try {
        const booking_rooms = await booking_room.find({ startDate: { $gte: data.startDate }, endDate: { $lte: data.endDate } })
        if (booking_rooms.length > 0) { res.sendStatus(409); }
        else {
            new booking_room(data).save((err, booking) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(201)
                }
            })
        }
    } catch (error) {
        res.sendStatus(500)
    }
}

export function deleteBookingRoom(req, res) {
    var id = req.params.id;
    booking_room.findByIdAndRemove(id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}
export function updateBookingRoom(req, res) {
    var data = req.body;
    var id = req.params.id;
    booking_room.findByIdAndUpdate(id, { $set: data }, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}
export function getBookingRoomName(req, res) {
    rooms.find({}, (err, room) => {
        if (err) {
            return res.sendStatus(500)
        } else {
            const result = [];
            for (let i = 0; i < room.length; i++) {
                const element = room[i];
                var obj = { id: i + 1, name: element.name, type: element.type }
                result.push(obj)
            }
            return res.send(result);
        }
    })
}

export async function filterBookingRoom(req, res) {
    const data = req.body;
    var startDate = new Date(data.startDate);
    var endDate = new Date(data.endDate);
    const booked_room = await booking_room.find({ startDate: { $gte: startDate }, endDate: { $lte: endDate }, status: { $nin: ['Đã từ chối'] } },)
    res.send(booked_room)
}
export async function getRoomBooking(req, res) {
    const data = req.body;
    var startDate = new Date(data.startDate);
    var endDate = new Date(data.endDate);
    console.log(`${startDate} ${endDate}`)
    const booked_room = await booking_room.find({ startDate: { $gte: startDate }, endDate: { $lte: endDate }, status: { $eq: 'Đang xử lý' } },)
    res.send(booked_room)
}