const express = require("express")
const router = express.Router()

//Routes
router.get("/", (req, res) => {
  res.send("hello from Express")
})

module.exports = router
