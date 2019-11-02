const bcrypt = require('bcryptjs')

const password = 'password'
const saltRounds = 10
const hash = bcrypt.hash(password, saltRounds)
console.log(hash)
