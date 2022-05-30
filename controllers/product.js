const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const Product = require("../models/product")
const bodyParser = require("body-parser")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded" + err,
      })
    } else {
      let product = new Product(fields)
      let { name, description, price, category, quantity, shipping } = fields
      let photo = files.photo

      // validations

      if (photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          })
        }
        console.log(photo.path)
        product.photo.data = fs.readFileSync(photo.path)

        product.photo.contentType = photo.type
      }

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: "All fields are required",
        })
      }

      product.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          })
        } else {
          res.json(data)
        }
      })
    }
  })
}

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Not Found" + err,
      })
    }

    req.product = product
    next()
  })
}

exports.read = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)
}
