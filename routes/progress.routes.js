const express = require("express")
const { postProgress } = require("../controllers/progress.controller")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.route("/watch/:idLesson")
    .post(verifyToken,postProgress)
// router.route("/course/:idLesson")
//     .get(verifyToken,getProgress)


module.exports = router