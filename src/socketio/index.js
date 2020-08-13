import socketIO from 'socket.io'
import {
  listFriend,
  joinRoom,
  leaveRoom,
  sendMessage,
  searchFriendChat
} from './handler'
import { verifyAuthSocket } from './util/verifyAuth'
import { saveUserSession, removeUserSession } from './util/userSession'

const initSocket = (http) => {
  const io = socketIO(http, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true
      };
      res.writeHead(200, headers);
      res.end();
    }
  })
  io.origins('*:*')

  io.on('connection', socket => {
    socket.on('offline', data => {
      console.log('offline active')
      socket.broadcast.emit('offline', socket.user._id)
    })
    socket.use(verifyAuthSocket(socket))
    socket.use(saveUserSession(socket))
    socket.on('online', data => {
      socket.broadcast.emit('online', socket.user._id)
    })
    socket.on('list-friend', listFriend(socket))
    socket.on('join-room', joinRoom(socket, io))
    socket.on('leave-room', leaveRoom(socket))
    socket.on('send-message', sendMessage(socket))
    socket.on('search-friend-chat', searchFriendChat(socket))

    socket.on('disconnect', async () => {
      console.log('on disconnected')
      removeUserSession(socket)
    })
  })
}

export default initSocket