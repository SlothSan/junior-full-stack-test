const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 254},
        favourites: {type: Array},
    }
);

module.exports = mongoose.model('User', UserSchema, 'usersCollection');
