import moogoose from 'mongoose'

const NestedUserSchema = moogoose.Schema({
  userId: String,
  username: String,
  imgUrl: String
})

const FriendSchema = moogoose.Schema({
  friends: [NestedUserSchema],
  roomId: String
})

const FriendModel = moogoose.model('Friend', FriendSchema)

export default FriendModel
