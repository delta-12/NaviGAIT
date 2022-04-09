const express = require("express")
const app = express()
const videos = require("./routes/api/videos")
var cors = require("cors")

const corsOptions ={
    origin: "https://navigait-web-app.herokuapp.com", 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use("/api/videos", videos)

const port = process.env.PORT || 5001

app.listen(port, () => console.log(`Server up and running on port ${port}!`))