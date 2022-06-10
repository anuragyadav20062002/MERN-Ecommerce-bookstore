const User = require("../models/user")
const { errorHandler } = require("../helpers/dbErrorHandler")
const jwt = require("jsonwebtoken") // to generate signed token
const { expressjwt } = require("express-jwt") //used for authorization check
const { token } = require("morgan")

//for authentication

exports.signup = (req, res) => {
  console.log("req.body", req.body)
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      })
    }
    user.salt = undefined
    user.hashed_password = undefined

    res.json({
      user,
    })
  })
}

exports.signin = (req, res) => {
  //find user based on email

  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return console.log("User not found please signup")
    }

    //check for email and password check
    //create a authenticate method in user model
    if (user) {
      if (!user.authenticate(password)) {
        return res.status(401).json({
          message: "Wrong Email or Password",
        })
      }

      //generate a token with id and secret

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      //persist token as 't' in cookie with expiry date

      res.cookie("t", token, { expire: new Date() + 9999 })

      //return response with user and token to frontend

      const { _id, name, email, role } = user
      return res.json({ token, user: { _id, email, name, role } })
    }
  })
}

exports.signout = (req, res) => {
  //clearing cookie from response

  res.clearCookie("t")
  res.json({ message: "Signout success" })
}

exports.requireSignin = expressjwt({
  //so that only authorized user access resources

  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // newer version of express-jwt requiers algorithms
  userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
  //so that one user cannot acess other user details or resources
  let user = req.profile && req.auth && req.profile._id == req.auth._id

  if (!user) {
    console.log("Cant find")
  }

  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resources! Acess Denied",
    })
  }

  next()
}
