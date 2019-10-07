const http = require('http')
const app = require('./app')
const connect = require('./utils/mg-connect')

const server = http.createServer(app)
server.listen(connect.PORT, () => {
  console.log(`Server running on port ${connect.PORT}`)
})
