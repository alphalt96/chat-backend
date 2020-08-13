import moogoose from 'mongoose'

const LastMessageSchema = moogoose.Schema({
  ownerId: String,
  lastMsg: String,
  lastMsgDatetime: Date
})

const MemberSchema = moogoose.Schema({
  memberId: String,
  isSeenNewMsg: Boolean,
  username: String,
  imgUrl: String
})

const FriendChatSchema = moogoose.Schema({
  members: [MemberSchema],
  lastMessage: LastMessageSchema,
  groupName: String
})

const FriendChatModel = moogoose.model('FriendChat', FriendChatSchema, 'friendChats')

export default FriendChatModel
