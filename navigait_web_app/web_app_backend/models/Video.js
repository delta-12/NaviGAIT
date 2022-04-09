const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideoSchema =  new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    processed: {
        type: Boolean,
        required: true
    },
    description: {
        type: String
    },
    patient: {
        type: String
    },
    dateUploaded: {
        type: Date,
        required: true
    }
})

module.exports = Video = mongoose.model("videos", VideoSchema)