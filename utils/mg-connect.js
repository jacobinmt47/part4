const mongoose = require('mongoose')
require('dotenv').config()

let PORT = process.env.PORT
const mongoUrl = process.env.DBURI

mongoose.set('useFindAndModify', false)
mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

module.exports = { PORT, blogSchema }
