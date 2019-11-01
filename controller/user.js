const bcrypt = require('bcryptjs')
const UserRouter = require('express').Router()
const User = require('../models/user')

UserRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('Blogs')
  response.json(users.map(u => u.toJSON()))
})

module.exports = UserRouter
