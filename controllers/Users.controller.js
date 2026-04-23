const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const User = require("../model/users.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = require("../utils/JWT.js");
const appError = require("../utils/appError.js");

const register = AsyncWrapper(async (req, res, next) => {
    const { password, number } = req.body;
    if (!password || !number) {
        const error = appError.create("Missing credentials", 400, FAIL);
        return next(error);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...req.body, password: hashPassword })
    await user.save()
    res.send({
        "status": SUCCESS,
        "data": {
            user
        }
    })
})
const login = AsyncWrapper(async (req, res, next) => {
    const number = req.body.number
    const password = req.body.password
    const user = await User.findOne({ number: number })
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
        const error = appError.create("Invalid credentials", 401, FAIL);
        return next(error);
    }

    const token = await JWT({ id: user._id, name: user.name, role: user.role })
    res.send({
        "status": SUCCESS,
        "data": {
            token
        }
    })
})
module.exports = { register, login }