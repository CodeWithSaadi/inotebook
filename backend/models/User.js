const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema from Mongoose documentation 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
   

});

User = mongoose.model('user', UserSchema);
// User.createIndexes();                -- not use because we are applying logic in auth.js
module.exports = User 