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