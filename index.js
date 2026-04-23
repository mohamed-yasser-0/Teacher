const express = require("express")
const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);
const { postCourse, getCourse, getSingleCourse, delCourse, updateCourse } = require("./controllers/Course.controller.js");
const courseRouter = require("./routes/course.routes.js");
const lessonRouter = require("./routes/lessons.routes.js");
const usersRouter = require("./routes/users.routes.js");
require('dotenv').config();

const app = express()
app.use(express.json())

mongoose
    .connect("mongodb+srv://moha:123@cluster0.ebncbe6.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log("Connected successfully with MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting MongoDB:", err.message);
    });

app.use("/api/course", courseRouter)
app.use("/api/lessons", lessonRouter)
app.use("/api/users", usersRouter)

app.use((req, res, next) => {
    res.json({ status: 'ERROR', message: 'this resource not found' })
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || 'ERROR',
        message: error.message || 'Something went wrong'
    });
});

app.listen(1000, () => { console.log("alhamd llah") })