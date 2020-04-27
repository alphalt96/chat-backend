import { addNewUser, verifyLogin, getUserInfo } from '../handler/user'
import {
  addNewUser as addNewUserValidate,
  verifyLogin as verifyLoginValidate
} from '../validate/user'
import authenticateMiddleware from '../middleware/authenticate'

export default [
  {
    method: 'post',
    path: '/users',
    validate: addNewUserValidate,
    handler: addNewUser
  },
  {
    method: 'post',
    path: '/users/login',
    validate: verifyLoginValidate,
    handler: verifyLogin
  },
  {
    method: 'get',
    path: '/users/:id',
    middlewares: [
      authenticateMiddleware
    ],
    handler: getUserInfo
  }
]
