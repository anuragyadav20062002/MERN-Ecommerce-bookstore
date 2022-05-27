const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")

//app
const app = express()

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected"))

//routes
app.get("/", (req, res) => {
  res.send("hello from Express")
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
