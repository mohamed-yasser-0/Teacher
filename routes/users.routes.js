const express = require("express")
const { register, login } = require("../controllers/Users.controller.js")
const router = express.Router()


router.route("api/register")
    .post(register)
router.route("api/login")
    .post(login)

module.exports = router