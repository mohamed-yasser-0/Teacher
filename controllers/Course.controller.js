const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
const Lesson = require("../model/lessons.js");
const appError = require("../utils/appError.js");


const postCourse = AsyncWrapper(async (req, res) => {
    const course = new Course(req.body)
    await course.save()
    res.send({
        "status": SUCCESS,
        "data": {
            course
        }
    })
})
const getCourse = AsyncWrapper(async (req, res) => {
    const course = await Course.find()
    res.send({
        "status": SUCCESS,
        "data": {
            course
        }
    })
})
const getSingleCourse = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("course not found", 404, FAIL)
        return next(error)
    }
    res.send({
        "status": SUCCESS,
        "data": {
            course
        }
    })
})
const updateCourse = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("course not found", 404, FAIL)
        return next(error)
    }
    course.title = "newCourse"
    res.send(course)
})
const delCourse = AsyncWrapper(async (req, res, next) => {
    id = req.params.idCourse
    const course = await Course.findByIdAndDelete(id)
    if (!course) {
        const error = appError.create("course not found", 404, FAIL)
        return next(error)
    }
    const lessons = await Lesson.deleteMany({ idCours: id });
    res.send("was deleted")
})

module.exports = { postCourse, getCourse, getSingleCourse, delCourse, updateCourse }