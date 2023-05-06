import accountModels from '../models/account.models.js';
export const signIn = (req, res) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        res.send({ message: 'Chưa nhập đầy đủ thông tin' });
    } else {
        accountModels.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                res.send({ error: err })
            } else {
                if (user.username && user.password) {
                    delete user.password;
                    return res.send(user)
                }
                return res.sendStatus(400)
            }
        })
    }
}
export function insertFromJson(req, res) {
    const data_insert = [];
    const data = req.body;
    accountModels.find({}, (err, account) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (account.some(e => e.username === element.username)) {
                console.log(element.username + " đã tồn tại")
            } else {
                data_insert.push(element)
            }
        }
        accountModels.insertMany(data_insert)
            .then(() => res.sendStatus(201))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
    });
}