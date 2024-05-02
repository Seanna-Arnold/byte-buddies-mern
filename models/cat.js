const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const catSchema = new Schema({
    petName: { 
        type: String,
    },
    health: { 
        type: Number,
        max: 5,
        min: 3
    },
    careInstructions: {
    type: String,
    enum: ['There\'s no more water!', 'My tummy is growling', 'I wanna cuddle', 'I feel...sick', 'Zoomies!!!', 'Litter box is getting stanky', 'Hair is everywhere and I\'m scratching up the couch'],
    },
    buttons: {
        type: String,
        enum: ['Hydrate', 'Feed', 'Snuggle', 'Vet Visit', 'Play', 'Clean Litter box', 'Cut Nails & Brush Fur'],
    },
    type: {
        type: String
    },
    infoPopup: {
        type: String
    },
    }, {
    timeStamps: true,
    });



module.exports = {
    Cat: mongoose.model('Cat', catSchema),
}