import moogoose from 'mongoose'

const userSchema = moogoose.Schema({
  email: String,
  username: String,
  password: String,
  birthday: String,
  socialLink: String,
  imgUrl: String
})

const userModel = moogoose.model('User', userSchema)

export default userModel
