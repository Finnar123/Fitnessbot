const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipe: {type: String},
    date: {type: String},
    boostcount: {type: Number, default: 0},
    uniqueID: {type: String, unique: true},
    recipeauthor: {type: String},

});


const model = mongoose.model('Recipes', recipeSchema);

module.exports = model;

//blacklists, help menu