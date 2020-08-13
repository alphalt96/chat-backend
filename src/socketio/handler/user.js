import { socketLogger as logger } from '../../shared/logger'
import md5 from 'md5'
import { FriendChat, Friend, User } from '../../model'

export const listFriend = socket => async request => {
  const friendChats = await FriendChat.find({
    "members.memberId": socket.user._id
  }).sort({
    "lastMessage.lastMsgDatetime": 1
  })
  const friendChatsResponse = friendChats.map(room => {
    const lastMessage = {
      isOwner: room.lastMessage.ownerId === socket.user._id.toString(),
      lastMsg: room.lastMessage.lastMsg,
      lastMsgDatetime: room.lastMessage.lastMsgDatetime
    }
    const members = room.members.filter(member => member.memberId !== socket.user._id.toString())
    let groupName = room.groupName
    let groupAvatar = room.groupAvatar
    if (room.members.length === 2) {
      groupName = members[0].username
      groupAvatar = members[0].imgUrl
    }
    return {
      roomId: room._id,
      members,
      lastMessage,
      groupName,
      groupAvatar
    }
  })
  socket.emit('list-friend-data', friendChatsResponse)
}

const createNewRoom = async (ids, message) => {
  const newRoom = await FriendChat.create({
    memberIds: ids,
    lastMessage: message
  })
  logger.info(`new room registered ${newRoom._id}`)
}

export const joinRoom = (socket, io) => async request => {
  console.log('debug joinroom', request.data)
  let roomId = request.data.roomId
  if (roomId) {
    const room = await FriendChat.findById({ _id: roomId })
    const memberIds = room.members.map(member => member.memberId)
    const socketMember = (await User.find({
      _id: { $in: memberIds }
    }).select('connId'))
      .map(i => io.sockets.sockets[i.connId])
      .filter(socket => socket)
  
    socketMember.forEach(socket => socket.join(roomId))
  }
}

export const leaveRoom = socket => request => {
  socket.leave(data.roomID)
  console.log('user has been leave room: ', request.data.roomID)
}

export const sendMessage = socket => request => {
  const roomId = request.data.roomId
  console.log('testttt debug room', roomId)
  if (roomId) {
    socket.to(roomId).emit('send-message', {
      content: request.data.content
    })
  }
}

export const searchFriendChat = socket => async request => {
  const key = request.data.key
  console.log('receving key search', key)
  const result = await Friend.find({
    $and: [
      {
        friends: {
          $elemMatch: {
            $and: [
              { username: { $regex: `.*${key}.*` } },
              { userId: { $ne: socket.user._id } }
            ]
          }
        }
      },
      {
        friends: {
          $elemMatch: {
            userId: socket.user._id
          }
        }
      },
      {
        friends: { $size: 2 }
      }
    ]
  })
  const searchFriendChatResult = result.map(data => {
    const findFriend = data.friends.find(friend => friend.userId !== socket.user._id.toString())
    const modData = {
      _id: data._id,
      friend: {
        userId: findFriend.userId,
        username: findFriend.username,
        imgUrl: findFriend.imgUrl
      },
      roomId: data.roomId
    }
    return modData
  })
  const data = {
    result: searchFriendChatResult,
    roomId: result.roomId
  }

  if (result) {
    socket.emit('search-friend-chat-data', data)
  }
}

const generateRoomID = (joinIDs) => {
  const sortedJoinIDs = joinIDs.sort()
  return md5(sortedJoinIDs.join(''))
}
