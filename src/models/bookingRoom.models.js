import mongoose from 'mongoose';

const bookingRoomSchema = new mongoose.Schema({
    account: String,
    room: String,
    startDate: Date,
    endDate: Date,
    desc: String,
    createdAt: Date,
    updatedAt: Date,
})
bookingRoomSchema.methods.toJSON = function () {
    const bookingRoom = this.toObject();
    delete bookingRoom.__v;
    return bookingRoom;
};

export default mongoose.model("BookingRoom", bookingRoomSchema)