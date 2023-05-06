import term from '../models/term.models.js';
export function listAllTerm(req, res) {
    term.find({}, (err, room_booking) => {
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
    term.find({}, (err, terms) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (terms.some(e => e.name === element.name)) {
                console.log(element.name + " đã tồn tại");
            } else {
                room_insert.push(element)
            }
        }
        term.insertMany(room_insert)
            .then(() => res.send({ status: 200, message: "Success" }))
            .catch(err => res.send({ status: false, message: err.name }))
    })
}

export function insertTerm(req, res) {
    var data = req.body;
    term.find({}, (err, terms) => {
        if (terms.some(e => e.startDate === data.startDate)) {
            return res.sendStatus(409)
        }
        new term(data).save((err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            } else {
                return res.sendStatus(201)
            }
        })
    });
}

export function deteleTerm(req, res) {
    var id = req.params.id;
    term.findByIdAndRemove(id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}
export function updateTerm(req, res) {
    var data = req.body;
    var id = req.params.id;
    term.findByIdAndUpdate(id, { $set: data }, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204);
        }
    });
}