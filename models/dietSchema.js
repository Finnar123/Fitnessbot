const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    userID: {type: String},
    date: {type: String},
    meals: {type: [String]},
});


const model = mongoose.model('Diets', dietSchema);

module.exports = model;

// const dietSchema = new mongoose.Schema({
//     userID: {type: String},
//     date: {type: String},
//     //serverID: {type: String, require: true},
//     //meal1: {type:{type: String}},
//     meal1: {type: String},
//     //meal2: {type: String},
//     //meal3: {type: String},
//     // meal2: {type:{type: String}},
//     // meal3: {type:{type: String}},
//     // meal4: {type:{type: String}},
//     // meal5: {type:{type: String}},
//     // meal6: {type:{type: String}},
//     // meal7: {type:{type: String}},
//     // meal8: {type:{type: String}},
//     // meal9: {type:{type: String}},
//     //coins: {type: Number, default: 0},
// });