const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        requried: true
    }
})

module.exports = mongoose.model('Role', RoleSchema);