import fs from 'fs'
import jwt from 'jsonwebtoken'
import { User } from '../../model'
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
    }).select('_id')

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
