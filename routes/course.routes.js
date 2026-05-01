const express = require("express")
const { postCourse, getCourse, getSingleCourse, updateCourse, delCourse } = require("../controllers/Course.controller")
const verifyToken = require("../middleware/verifyToken")
const allowdTo = require("../middleware/allowdTo")
const router = express.Router()
const multer = require("multer");

const diskStorage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads');
    },
    filename: function (req, file, cd) {
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now()}.${ext}`
        cd(null, fileName)
    }
})

const upload = multer({ storage: diskStorage });

router.route("/")
    .post(verifyToken, allowdTo("ADMIN"), upload.single('imgeCourse'), postCourse)
    .get(verifyToken, getCourse)
router.route("/:idCourse")
    .get(verifyToken, getSingleCourse)
    .patch(verifyToken, allowdTo("ADMIN"), updateCourse)
    .delete(verifyToken, allowdTo("ADMIN"), delCourse)

module.exports = router