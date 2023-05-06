import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import account from './src/routes/account.routes.js';
import booking_room from './src/routes/booking_room.routes.js';
import room from './src/routes/room.routes.js';
import term from './src/routes/term.routes.js';
const app = express()
const port = 3000
app.use(cors(
    {
        origin: "*"
    }
));
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/booking_room', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/accounts', account)
app.use('/rooms', room)
app.use('/booking_room', booking_room)
app.use('/term', term)

app.listen(port, () => {
    console.log(`Server is runing in https://localhost:${port}`);
})