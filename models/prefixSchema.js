const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guild: {type: String},
    prefix: {type: String},
});


const model = mongoose.model('Prefix', prefixSchema);

module.exports = model;