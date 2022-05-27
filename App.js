const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
//app
const app = express()

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected"))

//routes
app.use("/api", userRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
