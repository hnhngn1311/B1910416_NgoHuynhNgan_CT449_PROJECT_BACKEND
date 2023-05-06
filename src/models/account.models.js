import mongoose from 'mongoose';
const accountSchema = new mongoose.Schema({
    username: String,
    publicName: String,
    email: String,
    password: String,
    role: String
});
accountSchema.methods.toJSON = function () {
    const account = this.toObject();
    delete account.__v;
    delete account._id;
    return account;
};


export default mongoose.model("Account", accountSchema)