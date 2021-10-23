const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userID: {type: String},
    date: {type: String},
    workouts: {type: [String]},
});


const model = mongoose.model('Workouts', workoutSchema);

module.exports = model;

