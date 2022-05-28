const express = require("express")
const router = express.Router()
const {
  userById,
  requireSignin,
  isAdmin,
  isAuth,
} = require("../controllers/auth")

//Routes
router.get("/secret/userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  })
})

router.param("userId", userById)

module.exports = router
