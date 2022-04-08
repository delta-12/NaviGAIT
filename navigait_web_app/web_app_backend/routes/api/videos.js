const express = require("express")
const Video = require("../../models/Video")
const validateVideo = require("../../validation/videos")

const router = express.Router()

router.post("/addVideo", (req, res) => {
    const { errors, isValid } = validateVideo(req)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Video.findOne({ name: req.body.title }).then(video => {
        if (video) {
            return res.status(400).json({ title: "Video already exists with that title"})
        }
        const newVideo = new Video({
            title: req.body.title,
            description: req.body.description,
            patient: req.body.patient,
            processed: false,
            dateUploaded: req.body.dateUploaded
        })
        newVideo
            .save()
            .then(video => res.status(200).json({success: true, video: video}))
            .catch(err => {
                console.log(err)
                res.status(500).json({ success: false, error: "Failed to add video" })
            })
    })
})

router.get("/infoAll", (req, res) => {
    Video.find().sort("dateUploaded").then(videoList => {
        if (videoList) {
            return res.status(200).json({ success: true, videos: videoList })
        }
        return res.status(404).json({ success: false, error: "Failed to find videos" })
    })
})

module.exports = router