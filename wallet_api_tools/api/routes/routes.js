const express = require("express");
const router = express.Router();
const data = require("../requests/requests");

router.get("/usd", (request, result, next) => {
    return result.status(200).json({
        usd: data["usd"]
    });
});

router.get("/eur", (request, result, next) => {
    return result.status(200).json({
        eur: data["eur"]
    });
});

router.get("/gbp", (request, result, next) => {
    return result.status(200).json({
        gbp: data["gbp"]
    });
});

module.exports = router;