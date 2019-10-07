const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const Blog = require('./models/blog')
const mongoose = require('mongoose')

const connect = require('./utils/mg-connect')
const blogRouter = require('./controller/blog')
const middleware = require('./utils/middleware')

mongoose.set('useFindAndModify', false)
mongoose.connect(connect.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log('connected') })
  .catch(error => { console.log(error) })
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)
app.use(middleware)

console.log('just before export')
module.export = app
