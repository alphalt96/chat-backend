import {
  addNewUser,
  verifyLogin,
  getUserInfo,
  searchFriendChat
} from '../handler/user'
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
  },
  {
    method: 'post',
    path: '/users/searchfriendchat',
    middlewares: [
      authenticateMiddleware
    ],
    handler: searchFriendChat
  }
]
