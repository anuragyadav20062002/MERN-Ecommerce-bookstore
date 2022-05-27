const express = require("express")
const router = express.Router()
const { sayHi } = require("./controllers/user")

//Routes
router.get("/", sayHi)

module.exports = router
