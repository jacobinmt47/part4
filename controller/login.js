const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()
const User = require('../models/user')

LoginRouter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findOne({ username: body.userName })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: user.userName,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.userName, name: user.name })
})

module.exports = LoginRouter
