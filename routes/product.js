const express = require("express")
const router = express.Router()
const {
  create,
  productById,
  read,
  remove,
  update,
} = require("../controllers/product")
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth")
const { userById } = require("../controllers/user")

//Routes
router.get("/product/:productId", read)
router.post("/product/create/:userId", requireSignin, isAdmin, create)
router.delete("/product/:productId/:userId", requireSignin, isAdmin, remove)
router.put("/product/:productId/:userId", requireSignin, isAdmin, update)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router
