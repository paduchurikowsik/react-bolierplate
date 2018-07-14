const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    about: {
        type: String,
        requried: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('About', AboutSchema);