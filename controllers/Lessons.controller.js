const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const Lesson = require("../model/lessons.js");
const appError = require("../utils/appError.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");

const postLessons = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("course not found", 404, FAIL)
        return next(error)
    }
    const lesson = new Lesson({ ...req.body, idCours: id })
    await lesson.save()
    res.send({
        "status": SUCCESS,
        "data": {
            lesson
        }
    })
})
const getLessons = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idCourse
    const course = await Course.findById(id)
    if (!course) {
        const error = appError.create("course not found", 404, FAIL)
        return next(error)
    }
    const lessons = await Lesson.find({ idCours: id })
    res.send({
        "status": SUCCESS,
        "data": {
            lessons
        }
    })
})
const getSingleLesson = AsyncWrapper(async (req, res, next) => {

    const idLesso = req.params.idLesson
    const lesson = await Lesson.findById(idLesso)
    if (!lesson) {
        const error = appError.create("lesson not found", 404, FAIL)
        return next(error)
    }

    res.send({
        "status": SUCCESS,
        "data": {
            lesson
        }
    })
})
module.exports = { postLessons, getSingleLesson ,getLessons }