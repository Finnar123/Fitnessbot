const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    blacklist: {type: [String]},
    alreadyboost: {type: [String]},
    recipeblacklist: {type: [String]},
    main: {type: String},
    date: {type: String},
});


const model = mongoose.model('Checks', checkSchema);

module.exports = model;
