import moogoose from 'mongoose'

const UserSchema = moogoose.Schema({
  email: String,
  username: String,
  password: String,
  birthday: String,
  socialLink: String,
  imgUrl: String,
  connId: String
})

const UserModel = moogoose.model('User', UserSchema)

export default UserModel
