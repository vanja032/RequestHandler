const https = require("https");
const cluster = require("cluster");
const fs = require("fs");
require("dotenv").config();
const cpu_num = require("os").cpus().length;

const app = require("./app");

if(cluster.isMaster){
    const request = require("./api/requests/requests");

    for(let i = 0; i < cpu_num; i++){
        const w = cluster.fork();
        request.append_worker(w);
    }
}
else{
    const app_host = process.env.APP_HOST || "0.0.0.0";
    const app_port = process.env.APP_PORT || 3222;

    process.on("message", (message) => {
        app.shared(message);
    });

    const options = {
        cert: fs.readFileSync("/etc/letsencrypt/live/websocket.inery.io/fullchain.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/websocket.inery.io/privkey.pem")
    };

    const server = https.createServer(options, app.app);
    server.listen(app_port, app_host);
}