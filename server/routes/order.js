const express = require("express")
const router = express.Router()
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth")
const { userById, addOrderToUserhistory } = require("../controllers/user")
const { decreaseQuantity } = require("../controllers/product")
const { create, listOrders, getStatusValues } = require("../controllers/order")

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserhistory,
  decreaseQuantity,
  create
)

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders)
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
)

router.param("userId", userById)
module.exports = router
