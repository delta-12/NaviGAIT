const express = require("express")
const router = express.Router()
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const mime = require("mime")
const axios = require("axios")
const WebSocketClient = require("websocket").client

const validateVideoUploads = require("../../validation/upload")

const client = new WebSocketClient()

const webApp = process.env.WEBAPP
const webSoc = process.env.WEBSOC

const uploadedVideosDir = "videos/uploaded/"
const processedVideosDir = "videos/processed/"

client.on("connect", connection => {
  console.log("Successfully Connected to Socket")
  let connectMsg = { type: "init" }
  connection.send(JSON.stringify(connectMsg))

  connection.on("error", error => {
    console.log("Socket Error: ", error)
  })

  connection.on("close", () => {
    console.log("Socket Closed Connection")
    client.connect(webSoc)
  })

  connection.on("message", msg => {
    let msgJSON = JSON.parse(msg.utf8Data)
    console.log(msgJSON)
    if (msgJSON.type === "processed") {
      fs.unlink(uploadedVideosDir + msgJSON.uploaded, err => {
        if (err) throw err
      })
      let reqUpdate = {
        videoID: msgJSON.video._id,
        update: {
          title: msgJSON.video.title,
          fullTitle: msgJSON.output,
          processed: true,
          description: msgJSON.video.description,
          patient: msgJSON.video.patient,
          dateUploaded: msgJSON.video.dateUploaded
        }
      } 
      axios.post(webApp+"/api/videos/updateVideo", reqUpdate)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  sendMsg = msg => {
    connection.send(JSON.stringify(msg))
  }
})

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
          let msg = {
            type: "upload",
            video: backendRes.data.video
          }
          sendMsg(msg) 
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

router.post("/download", multer().none(), (req, res) => {
  let file = (req.body.processed === "true") ? processedVideosDir + req.body.fullTitle : uploadedVideosDir + req.body.fullTitle 

  let filename = path.basename(file)
  let mimetype = mime.lookup(file)

  res.setHeader('Content-disposition', 'attachment; filename=' + filename)
  res.setHeader('Content-type', mimetype)

  let filestream = fs.createReadStream(file)
  filestream.pipe(res)
})

router.get("/stream", multer().none(), (req, res) => {
  const path = (req.query.processed === "true") ? processedVideosDir + req.query.fullTitle : uploadedVideosDir + req.query.fullTitle 
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head)
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

client.connect(webSoc)

module.exports = router