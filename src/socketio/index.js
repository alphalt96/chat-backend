import socketIO from 'socket.io'
import {
  listFriend,
  joinRoom,
  leaveRoom,
  sendMessage
} from './handler'

const initSocket = (http) => {
  const io = socketIO(http)

  io.on('connection', socket => {
    console.log('a user connected')
    socket.on('list-friend', listFriend(socket))
    socket.on('join-room', joinRoom(socket))
    socket.on('leave-room', leaveRoom(socket))
    socket.on('send-message', sendMessage(socket))
  })
}

export default initSocket