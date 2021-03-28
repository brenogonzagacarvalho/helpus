const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

const Moviedb = mongoose.model('moviedb', schema);

module.exports = Moviedb;