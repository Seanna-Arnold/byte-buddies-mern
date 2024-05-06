const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const petSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    petName: { type: String },
    health: { type: Number, max: 5, min: 0, required: true },
    petType: { type: String, enum: ['cat', 'dog'] }, }, 
    { timeStamps: true }
);


module.exports = {
    Pet: mongoose.model('Pet', petSchema),
}