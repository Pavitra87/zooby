const mongoose = require('mongoose')

const SongSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    audioFile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SongCategory',
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model("Song", SongSchema)