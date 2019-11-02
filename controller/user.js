const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('Blogs')
  response.json(users.map(u => u.toJSON()))
})

UserRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = User({
      userName: body.userName,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})
module.exports = UserRouter
