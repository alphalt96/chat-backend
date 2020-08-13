import fs from 'fs'
import jwt from 'jsonwebtoken'
import { User, Friend } from '../../model'
import ApiError from '../../shared/customApiError'
import { auth, status, statusName } from '../util/define'

export const addNewUser = async (req, res, next) => {
  try {
    const prepareData = req.body
    const newUser = new User(prepareData)
    await newUser.save()
    res.status(status.OK.code).json({
      message: status.OK.message
    })
  } catch (e) {
    next(new ApiError(statusName.error, e))
  }
}

export const verifyLogin = async (req, res, next) => {
  try {
    const account = req.body.email || req.body.username,
      password = req.body.password
    const userInfo = await User.findOne({
      $or: [
        { email: account },
        { username: account }
      ],
      password: password
    }).select('_id username')

    if (!userInfo) {
      return next(new ApiError(statusName.unauthorization))
    }

    const privateKey = fs.readFileSync(auth.privateKeyPem)

    const token = jwt.sign({
      _id: userInfo._id.toString()
    }, privateKey, {
      algorithm: auth.authAlogrithm
    })
    const body = {
      user: {
        username: userInfo.username
      },
      token
    }

    res.status(status.OK.code).json(body)
  } catch (e) {
    return next(new ApiError(statusName.error, e))
  }
}

export const getUserInfo = (req, res, next) => {
  try {
    res.status(status.OK.code).json()
  } catch (e) {
    next(new ApiError(statusName.error, e))
  }
}

export const searchFriendChat = async (req, res, next) => {
  try {
    const key = req.body.key
    const result = await Friend.find({
      $and: [
        {
          friends: {
            $elemMatch: {
              $and: [
                { username: { $regex: `.*${key}.*` } },
                { userId: { $ne: req.auth._id } }
              ]
            }
          }
        },
        {
          friends: {
            $elemMatch: {
              userId: req.auth._id
            }
          }
        },
        {
          friends: { $size: 2 }
        }
      ]
    })
    if (!result.length) {
      return next(new ApiError(statusName.notfound))
    }
    const searchFriendChatResult = result.map(data => {
      const findFriend = data.friends.find(friend => friend.userId !== req.auth._id.toString())
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
    const body = {
      result: searchFriendChatResult,
      roomId: result.roomId
    }

    res.status(status.OK.code).json(body)
  } catch (e) {
    next(new ApiError(statusName.error, e))
  }
}

export const searchGroupChat = async (req, res, next) => {
  const friendChats = await FriendChat.find({
    "members.memberId": socket.user._id
  }).sort({
    "lastMessage.lastMsgDatetime": 1
  })
  const friendChatsResponse = friendChats.map(friend => {
    const lastMessage = {
      isOwner: friend.lastMessage.ownerId === socket.user._id.toString(),
      lastMsg: friend.lastMessage.lastMsg,
      lastMsgDatetime: friend.lastMessage.lastMsgDatetime
    }
    const members = friend.members.filter(member => member.memberId !== socket.user._id.toString())
    let groupName = friend.groupName
    let groupAvatar = friend.groupAvatar
    if (friend.members.length === 2) {
      groupName = members[0].username
      groupAvatar = members[0].imgUrl
    }
    return {
      members,
      lastMessage,
      groupName,
      groupAvatar
    }
  })
}