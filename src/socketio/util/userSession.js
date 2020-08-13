import { User } from '../../model'

export const saveUserSession = socket => async (request, next) => {
  const connId = socket.id
  const authId = socket.user._id
  await User.findOneAndUpdate({ _id: authId }, { connId })
  next()
}

export const removeUserSession = async socket => {
  const authId = socket.user.id
  await User.findOneAndUpdate({ _id: authId }, { connId: undefined })
}
