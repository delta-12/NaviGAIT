const express = require("express")
const Patient = require("../../models/Patients")
const validatePatients = require("../../validation/patients")

const router = express.Router()

router.post("/addPatient", (req, res) => {
    const { errors, isValid } = validatePatients(req)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newPatient = new Patient({
        name: req.body.name,
        birthday: req.body.birthday,
        sex: req.body.sex
    })
    newPatient
        .save()
        .then(patient => {
            return res.status(200).json({success: true, patient: patient})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ success: false, error: "Failed to add patient" })
        })
})


router.post("/deletePatient", (req, res) => {
    Patient
        .deleteOne({ _id: req.body.patientID })
        .then(() => {
            return res.status(200).json({ success: true })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ success: false, error: err })
        })
})

router.post("/updatePatient", (req, res) => {
    Patient
        .updateOne({ _id: req.body.patientID }, req.body.update, {new: true})
        .then(patient => {
            if (patient) {
                return res.status(200).json({ success: true, updatedPatient: patient })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ success: false, error: err })
        })
})

router.get("/infoAll", (req, res) => {
    Patient.find().sort("name").then(patientList => {
        if (patientList) {
            return res.status(200).json({ success: true, patients: patientList })
        }
        return res.status(404).json({ success: false, error: "Failed to find patients" })
    })
})

module.exports = router