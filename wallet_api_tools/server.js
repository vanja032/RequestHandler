const https = require("https");
const fs = require("fs");
require("dotenv").config();

const app = require("./app");
const app_host = process.env.APP_HOST || "0.0.0.0";
const app_port = process.env.APP_PORT || 3222;

const options = {
    cert: fs.readFileSync("<path to the certificate>"),
    key: fs.readFileSync("<path to the certificate key>")
};

const server = https.createServer(options, app);
server.listen(app_port, app_host);