const express = require("express")
const router = express.Router()
const { requireSignin, isAuth } = require("../controllers/auth")
const { userById, addOrderToUserhistory } = require("../controllers/user")
const { decreaseQuantity } = require("../controllers/product")
const { create } = require("../controllers/order")

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserhistory,
  decreaseQuantity,
  create
)

router.param("userId", userById)
module.exports = router
