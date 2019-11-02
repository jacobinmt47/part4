const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('Blogs')
  response.json(users.map(u => u.toJSON()))
})

UserRouter.post('/', async (request, response, next) => {
  const { body } = request
  if (body.userName.length < 3 && body.password.length < 3) {
    response.status(400)
    console.log('userName and password length must be equal or greater than 3')
    return (400)
  }
  const users = await User.find({ userName: `${body.userName}` })
  console.log(users.length)
  if (users.length !== 0) {
    console.log('user names must be unique  name found in collection')
    response.status(400)
    return (400)
  }
  try {
    const saltRounds = 10
    console.log('called before password hash')
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
  return (200)
})
module.exports = UserRouter
