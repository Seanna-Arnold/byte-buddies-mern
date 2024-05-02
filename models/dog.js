const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const dogSchema = new mongoose.Schema({
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
    enum: ['There\'s no more water!', 'My tummy is growling', 'I need to pee and get air', 'I feel...sick', 'Zoomies!!!', 'Litter box is getting stanky', 'Hair is everywhere and I\'m scratching up the couch'],
    },
    buttons: {
    type: String,
        enum: ['Hydrate', 'Feed', 'Walk', 'Vet Visit', 'Play Time', 'Train' , 'Bath Time'],
    },
    type: {
        type: String
    },
    infoPopup: {
        type: String
    }, 
    pets: [petSchema]
    }, {
    timeStamps: true,
    });

module.exports = {
    Dog: mongoose.model('Dog', dogSchema),
}