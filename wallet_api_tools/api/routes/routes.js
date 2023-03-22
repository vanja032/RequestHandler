const express = require("express");
const router = express.Router();
var shared_data = require("../data/data");


router.get("/usd", (request, result, next) => {
    return result.status(200).json({
        usd: getSharedData()["usd"]
    });
});

router.get("/eur", (request, result, next) => {
    return result.status(200).json({
        eur: getSharedData()["eur"]
    });
});

router.get("/gbp", (request, result, next) => {
    return result.status(200).json({
        gbp: getSharedData()["gbp"]
    });
});

module.exports = {
    router: router,
    shared: changeData
};

function changeData(shared_datas){
    shared_data = shared_datas;
}

function getSharedData(){
    const data = shared_data;
    return data;
}