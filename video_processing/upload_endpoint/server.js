const express = require("express")
const app = express()
const videos = require("./routes/api/videos")
var cors = require('cors');

app.use(cors())

app.use("/api/videos", videos)

const port = process.env.PORT || 5001

app.listen(port, () => console.log(`Server up and running on port ${port}!`))