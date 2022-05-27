const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressValidator = require("express-validator")
//app
const app = express()

//database
mongoose
  .connect(process.env.DATABASE, {
    autoIndex: true,
  })
  .then(() => console.log("Database connected"))

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//routes
app.use("/api", authRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
