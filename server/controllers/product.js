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
        console.log(photo.filepath)
        product.photo.data = fs.readFileSync(photo.filepath)

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

exports.remove = (req, res) => {
  let product = req.product
  product.remove((err, deleted) => {
    if (err) {
      return res.status(400).json({
        error: "Error in deleting" + err,
      })
    }

    res.json({
      deleted,
      message: "Deleted Successfully",
    })
  })
}

exports.update = (req, res) => {
  let form = new formidable.IncomingForm()

  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded" + err,
      })
    } else {
      let product = req.product
      let { name, description, price, category, quantity, shipping } = fields
      let photo = files.photo

      product = _.extend(product, fields)

      // validations
      if (photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          })
        }

        product.photo.data = fs.readFileSync(photo.filepath)
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
          error: "All files are required",
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

//sell/arival
//by sell = /product?sortBy = sold&order =desc&limit=4
//by arrival = /product?sortBy = createdAt&order =desc&limit=4
//if not params sent all products are returned

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        })
      } else {
        res.json(products)
      }
    })
}

//finding realted products based on req product category

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find({ id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        })
      } else {
        res.json(products)
      }
    })
}

exports.listCategories = (req, res) => {
  Product.distinct("category", {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Products not found",
      })
    } else {
      res.json(product)
    }
  })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc"
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id"
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        })
      }
      res.json({
        size: data.length,
        data,
      })
    })
}

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }

  next()
}

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {}
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" }
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        })
      }
      res.json(products)
    }).select("-photo")
  }
}
