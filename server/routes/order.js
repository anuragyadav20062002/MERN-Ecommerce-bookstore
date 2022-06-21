const express = require("express")
const router = express.Router()
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth")
const { userById, addOrderToUserhistory } = require("../controllers/user")
const { decreaseQuantity } = require("../controllers/product")
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
} = require("../controllers/order")

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
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
)

router.param("userId", userById)
router.param("userId", orderById)
module.exports = router
