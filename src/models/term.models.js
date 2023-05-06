import mongoose from 'mongoose';
const termScheme = new mongoose.Schema({
    term: String,
    schoolYear: String,
    startDate: Date,
})
termScheme.methods.toJSON = function () {
    const term = this.toObject();
    delete term.__v;
    return term;
};
export default mongoose.model("Term", termScheme)