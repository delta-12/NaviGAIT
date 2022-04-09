const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")
const axios = require("axios")
const webApp = process.env.WEBAPP

const validateVideoUploads = require("../../validation/videos")

const uploadedVideosDir = "videos/uploaded/"
const processedVideosDir = "videos/processed/"

let currentUploads = []
let request = {}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadedVideosDir) // store files in `files` directory
  },
  filename: (req, file, cb) => {
    const date = Date.now()
    const filename = date + "-" + file.originalname
    request.dateUploaded = date
    currentUploads.push(filename)
    cb(null, filename)
  }
})

const upload = multer({ storage: storage }).array("file")

removeVideos = () => {
  for (let i = currentUploads.length - 1; i >= 0; i--) {
    fs.unlink(uploadedVideosDir+currentUploads[i], err => {
      if (err) throw err
    })
    currentUploads.pop()
  }
}

router.post("/upload", (req, res) => {
  currentUploads = []
  request = {}
  upload(req, res, err => {
    const { errors, isValid } = validateVideoUploads(req)
    if (!isValid) {
      removeVideos()
      return res.status(400).json({ errors })
    }
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    for (let i = currentUploads.length - 1; i >= 0; i--) {
      let updatedName = request.dateUploaded+"-"+req.body.title+"."+currentUploads[i].split('.').pop()
      request.fullTitle = updatedName
      fs.rename(uploadedVideosDir+currentUploads[i], uploadedVideosDir+updatedName, err => {
        if (err) {
          removeVideos()
          return res.status(500).json(err)
        }
      })
      currentUploads[i] = updatedName
    }
    request.title = req.body.title
    request.description = req.body.description
    request.patient = req.body.patient
    axios.post(webApp+"/api/videos/addVideo", request)
      .then(backendRes => {
        if (backendRes.data.success)
        {
          return res.status(200).json({ success: true })
        }
        removeVideos()
        return res.status(500).json({ success: false })
      })
      .catch(err => {
        removeVideos()
        return res.status(400).json({ errors: err.response.data })
      })
  })
})

router.post("/delete", multer().none(), (req, res) => {
  const data = {
    videoID: req.body.videoID
  }
  axios.post(webApp+"/api/videos/deleteVideo", data)
    .then(() => {
      if (req.body.processed === "true") {
        fs.unlink(processedVideosDir + req.body.fullTitle, err => {
          if (err) {
            return res.status(500).json(err)
          }
          return res.status(200).json({ success: true })
        })
      }
      fs.unlink(uploadedVideosDir + req.body.fullTitle, err => {
        if (err) {
          return res.status(500).json(err)
        }
        return res.status(200).json({ success: true })
      })
    })
    .catch(err => {
      return res.status(400).json({ errors: err.response.data })
    })
})

module.exports = router