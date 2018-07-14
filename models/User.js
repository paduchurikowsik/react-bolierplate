const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    fullname: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: [Schema.Types.ObjectId],
        ref: 'Role'
    }

});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;

            next();
        });

    });
});

module.exports = mongoose.model('User', UserSchema);