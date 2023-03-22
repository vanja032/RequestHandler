const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const routes = require("./api/routes/routes");

//app.use(parser.urlencoded({extended: false}));
//app.use(parser.json());
app.use(morgan("dev"));

app.use((request, result, next) => {
    result.header("Access-Control-Allow-Origin", "*");
    if(request.method === "OPTIONS"){
        result.header("Access-Control-Allow-Methods", "GET");
        return result.status(200).json({});
    }
    next();
});

app.use(cors({
    origin: "*"
}));

app.use("/rates", routes.router);


module.exports = {
    app: app,
    shared: sh
};

function sh(ww){
    routes.shared(ww);
}