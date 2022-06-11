const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PatientSchema =  new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: Date
    },
    sex: {
        type: String
    }
})

module.exports = Patient = mongoose.model("patient", PatientSchema)