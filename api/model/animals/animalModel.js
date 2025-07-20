const mongoose = require('mongoose')

const AnimalSchema = mongoose.Schema({
    animalname: {
        type: String,
        required: true
    },
    images: [String],
    sound: {
        type: String
    },
    pronunciation: {
        type: String
    },
    video: { type: String },
    info: {
        description: { type: String },
        scientificName: { type: String },
        trophicLevel: { type: String },
        lifeSpan: { type: String },
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }


}, { timestamps: true });

module.exports = mongoose.model("Animal", AnimalSchema)