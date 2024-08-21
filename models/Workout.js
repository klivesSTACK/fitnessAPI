const mongoose = require("mongoose");

const workOutSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, 'Id of user is required']
    },
    name: {
        type: String,
        required: [true, 'Workout name is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    status: {
        type: String,
        default: 'Pending'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('WorkOut', workOutSchema);