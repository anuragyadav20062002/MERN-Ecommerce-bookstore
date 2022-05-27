const express = require("express")
const router = express.Router()
const { userById, requireSignin } = require("../controllers/auth")

//Routes
router.get("/secret/userId", requireSignin, (req, res) => {
  res.json({
    user: req.profile,
  })
})

router.param("userId", userById)

module.exports = router
