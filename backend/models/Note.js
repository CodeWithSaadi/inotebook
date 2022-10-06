const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({


    user: {                                         // to: The notes of user is not seen by other user 
        type: mongoose.Schema.Types.ObjectId,               //which user comes in this Id
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    // attachment: {
    //     type: File,
    //     required: true
    // },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('notes', NoteSchema);