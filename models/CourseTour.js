const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseTourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('CourseTour', CourseTourSchema);