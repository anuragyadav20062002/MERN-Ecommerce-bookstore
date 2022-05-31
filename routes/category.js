const express = require("express")
const router = express.Router()
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category")
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth")
const { userById } = require("../controllers/user")

//Routes
router.post("/category/create/:userId", requireSignin, isAdmin, create)
router.get("/category/:categoryId", read)
router.put("/category/:categoryId/:userId", requireSignin, isAdmin, update)
router.delete("/category/:categoryId/:userId", requireSignin, isAdmin, remove)
router.get("/categories", list)

router.param("categoryId", categoryById)
router.param("userId", userById)

module.exports = router
