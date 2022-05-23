const express = require("express")
const app = express()
const videos = require("./routes/api/videos")
const https = require("https")
const fs = require("fs")
var cors = require("cors")

const privateKey = fs.readFileSync("/etc/letsencrypt/live/navigait-uploads.ddns.net/privkey.pem", "utf8")
const certificate = fs.readFileSync("/etc/letsencrypt/live/navigait-uploads.ddns.net/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/navigait-uploads.ddns.net/chain.pem", "utf8")

const options = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

app.use(cors())

app.use("/api/videos", videos)

const port = process.env.PORT || 5001

app.listen(port, () => console.log(`Server up and running on port ${port}!`))

https.createServer(options, app).listen(10444);