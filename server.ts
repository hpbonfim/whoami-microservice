// server.ts
// where your node app starts

// init project
import express = require('express')
const app: express.Application = express()

import ip = require("ip")
const PORT = process.env.PORT || 3210

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors = require("cors")

//options for cors midddleware
const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "localhost" , //API_URL
    preflightContinue: false
  }
app.use(cors(options))
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req: any, res: any) {
    res.sendFile(__dirname + "/views/index.html")
})

// your first API endpoint...
app.get("/api/hello", function (req: any, res: any) {
    res.json({
        greeting: "hello API"
    })
})

app.get("/api/whoami", function (req: any, res: any) {
    let endereco_ip = ip.address()
    let lang = req.headers["accept-language"]
    let soft = req.headers["user-agent"]
    res.json({
        ipaddress: endereco_ip,
        language: lang,
        software: soft
    })
})

// listen for requests :)
const listener: any = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})