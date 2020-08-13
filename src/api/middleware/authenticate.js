import jwt from 'jsonwebtoken'
import ApiError from '../../shared/customApiError'
import { statusName, auth } from '../util/define'
import User from '../../model/user'
import fs from 'fs'

const verfifyAuth = async (req, res, next) => {
  try {
    let token
    const authorization = req.header('Authorization')
    if (!authorization) next(new ApiError(statusName.unauthorization))
    const spliteds = authorization.split(' ')
    if (spliteds[0] !== 'Bearer' || !spliteds[1]) {
      next(new ApiError(statusName.unauthorization))
    }
    token = spliteds[1]
    const publicKey = fs.readFileSync(auth.publicKeyPem)
    const payload = jwt.verify(token, publicKey)
    const queryResult = await User.findById(payload._id).select('_id')
    if (!queryResult) next(new ApiError(statusName.unauthorization))
    req.auth = queryResult
    next()
  } catch (e) {
    switch (e.constructor) {
      case jwt.JsonWebTokenError:
      case jwt.TokenExpiredError:
        return next(new ApiError(statusName.unauthorization))
      default:
        return next(new ApiError(statusName.error, e))
    }
  }
}

export default verfifyAuth
