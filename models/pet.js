const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
	
const petSchema = new mongoose.Schema({
    petName: { 
        type: String,
    },
    health: { 
        type: Number,
        max: 5,
    },

    emotion: {
        type: String,
        enum: ['happy', 'sad', 'hungry', 'playful'],
        default: 'happy',
        required: true
    }
});

const catSchema = new mongoose.Schema({
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
    pets: [petSchema]
    }, {
    timeStamps: true,
    });

const dogSchema = new mongoose.Schema({
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
    Pet : mongoose.model('Pet', petSchema),
    Cat : mongoose.model('Cat', catSchema),
    Dog : mongoose.model('Dog', dogSchema),
}