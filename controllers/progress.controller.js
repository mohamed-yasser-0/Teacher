const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const Course = require("../model/course.js");
const Lesson = require("../model/lessons.js");
const Progress = require("../model/progress.js");
const appError = require("../utils/appError.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");

const postProgress = AsyncWrapper(async (req, res, next) => {
    const id = req.params.idLesson
    const lesson = await Lesson.findById(id)
    if (!lesson) {
        const error = appError.create("lesson not found", 404, FAIL)
        return next(error)
    }
    console.log(req.user.id)
    const progress = new Progress({ ...req.body, lessonId: id, userId: req.user.id, courseId: lesson.idCours })
    await progress.save()
    res.send({
        "status": SUCCESS,
        "data": {
            progress
        }
    })
})
// const getProgress = AsyncWrapper(async (req, res, next) => {

//     const idLesso = req.params.idLesson
//     const user = await Lesson.findById(req.user.id)
//     const user = await Lesson.findById(idLesso)
//     if (!user) {
//         const error = appError.create("user not found", 404, FAIL)
//         return next(error)
//     }

//     res.send({
//         "status": SUCCESS,
//         "data": {
//             lesson
//         }
//     })
// })
module.exports = { postProgress }