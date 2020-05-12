"use strict";
// server.js
// where your node app starts
Object.defineProperty(exports, "__esModule", { value: true });
// init project
const express = require("express");
const app = express();
const ip = require("ip");
const PORT = process.env.PORT || 3210;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
//options for cors midddleware
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "test",
    preflightContinue: false
};
app.use(cors(options));
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({
        greeting: "hello API"
    });
});
app.get("/api/whoami", function (req, res) {
    let endereco_ip = ip.address();
    let lang = req.headers["accept-language"];
    let soft = req.headers["user-agent"];
    res.json({
        ipaddress: endereco_ip,
        language: lang,
        software: soft
    });
});
// listen for requests :)
const listener = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
