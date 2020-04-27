exports.listFriend = socket => msg => {
  console.log('receive msg:', msg)
  socket.emit('list-friend', ['1', '2'])
}

exports.joinRoom = socket => data => {
  socket.join(data.roomID)
  console.log('user has been join room: ', data.roomID)
}

exports.leaveRoom = socket => data => {
  socket.leave(data.roomID)
  console.log('user has been leave room: ', data.roomID)
}

exports.sendMessage = socket => data => {
  console.log('get msg', data)
  socket.to(data.roomID).emit('send-message', {
    content: data.content
  })
}
