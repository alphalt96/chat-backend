import jwt from 'jsonwebtoken'
import { User } from '../../model'
import fs from 'fs'
import { auth } from '../../api/util/define'
import { socketLogger as logger } from '../../shared/logger'

logger.addContext('type', 'SOCKET')

const throwSocketUnAuthError = next => {
  const err = new Error('unauthorized')
  err.data = { type: 'UNAUTHORIZED' }
  return next(err)
}

export const verifyAuthSocket = socket => async (request, next) => {
  try {
    if (request[0] === 'offline') return next()
    const token = request[1].auth.token
    if (!token || token === 'null') {
      throwSocketUnAuthError(next)
    }
    const publicKey = fs.readFileSync(auth.publicKeyPem)
    const payload = jwt.verify(token, publicKey)
    const user = await User.findById(payload._id)
    if (!user) throwSocketUnAuthError(next)

    socket.user = user
    delete request[1].auth
    return next()
  } catch (e) {
    logger.error(e)
    return next(e)
  }
}
