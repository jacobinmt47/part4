const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()
const User = require('../models/user')

LoginRouter.post('/',async (request,response) =>{
  const { body } = request
  const user = User.findOne({username: body.username})
  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(user.passwordHash, body.password)
  if(!(user && passwordCorrect)){
      response.status(401).json({error: 'invalid username or password'})
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = LoginRouter