
require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl = process.env.DBURI
module.exports = { PORT, mongoUrl }
