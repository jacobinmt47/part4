const bcrypt = require('bcrypt')

const call = async () => {
  const password = 'password'
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  console.log(hash)
}
call()
