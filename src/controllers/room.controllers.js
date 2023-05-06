import room from '../models/room.models.js';
export function listAllRoom(req, res) {
    room.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
        } else {
            res.send(users);
        }
    });
}
export function insertFromJson(req, res) {
    const data = req.body;
    const room_insert = []
    room.find({}, (err, rooms) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (rooms.some(e => e.name === element.name)) {
                console.log(element.name + " đã tồn tại");
            } else {
                room_insert.push(element)
            }
        }
        room.insertMany(room_insert)
            .then(() => res.send({ status: 200, message: "Success" }))
            .catch(err => res.send({ status: false, message: err.name }))
    })
}

export function insertData(models, data, check_exist) {
    if (check_exist) {
        return false;
    } else {
        new models(data).save(err => {
            if (err) {
                console.log(err);
                return false;
            } else {
                return true;
            }
        });
    };
}
export function insertRoom(req, res) {
    var data = req.body;
    room.find({}, (err, rooms) => {
        if (rooms.some(e => e.name === data.name)) {
            return res.sendStatus(409)
        }
        new room(data).save((err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            } else {
                return res.sendStatus(201)
            }
        })
    });
}

export function deleteRoom(req, res) {
    var id = req.params.id;
    room.findByIdAndRemove(id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}
export function updateRoom(req, res) {
    var data = req.body;
    var id = req.params.id;
    room.findByIdAndUpdate(id, { $set: data }, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}