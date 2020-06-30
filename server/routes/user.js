const express = require("express")
const router = express.Router()

const {SignUp,Login} = require("../controllers/profile")
const {auth} = require("../helpers/auth")

router.route("/register").post(SignUp)
router.route("/login").post(Login)
router.route("/tokenIsValid").post(auth)

module.exports = router