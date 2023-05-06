import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
    name: String,
    type: String,
    desc: String,
})
roomSchema.methods.toJSON = function () {
    const room = this.toObject();
    delete room.__v;
    return room;
};
export default mongoose.model("Room", roomSchema)