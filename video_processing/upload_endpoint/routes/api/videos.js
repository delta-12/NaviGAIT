const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")
const axios = require("axios")

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
    // axios.post("http://localhost:5000/api/videos/addVideo", request)
    //   .then(res => {
    //     console.log(res.data)
    //     if (!res.data.success)
    //     {
    //       console.log(res.data)
    //       removeVideos()
    //       // return res.status(500).json({ success: false })
    //     }
    //     currentUploads = []
    //     request = {}
    //     // return res.status(200).json({ success: true })
    //   })
    //   .catch(err => {
    //     removeVideos()
    //     // return res.status(500).json({ success: false, error: err })
    //   })
    request = {}
    currentUploads = []
    return res.status(200).json({ success: true })
  })
})

module.exports = router