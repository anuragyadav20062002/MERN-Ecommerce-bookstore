const Category = require("../models/category")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.satus(400).json({
        err: errorHandler(err),
      })
    }

    res.json({ data })
  })
}

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: `Category with ID ${id} not found`,
      })
    } else {
      req.category = category
    }

    next()
  })
}

exports.read = (req, res) => {
  let category = req.category

  if (category) {
    return res.json({
      category,
    })
  }
}
