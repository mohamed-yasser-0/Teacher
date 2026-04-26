const express = require("express")
const { postLessons, getSingleLesson, getLessons } = require("../controllers/Lessons.controller")
const verifyToken = require("../middleware/verifyToken")
const allowdTo = require("../middleware/allowdTo")
const router = express.Router()


router.route("/:idCourse")
    .post(verifyToken,allowdTo("ADMIN"),postLessons)
    .get(verifyToken,getLessons)
router.route("/single/:idLesson")
    .get(verifyToken,getSingleLesson)


module.exports = router