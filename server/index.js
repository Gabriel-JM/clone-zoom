const server = require('http').createServer((req, res) => {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methos': 'OPTIONS, GET, POST, PUT, DELETE'
  })

  res.end()
})

const socketIO = require('socket.io')
const io = socketIO(server, {
  cors: {
    origin: '*',
    credentials: false
  }
})

io.on('connection', socket => {
  console.log('connection', socket.id)
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on('disconnect', () => {
      console.log('disconnected', roomId, userId)
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

function startServer() {
  const { address, port } = server.address()
  console.info(`App running at ${address}:${port}`)
}

server.listen(process.env.PORT || 3000, startServer)
