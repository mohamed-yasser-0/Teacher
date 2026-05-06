const express = require("express")
const { postDeg, getDeg } = require("../controllers/deg.controller.js")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.route("/")
    .post(verifyToken, postDeg)
    .get(verifyToken, getDeg)
module.exports = router