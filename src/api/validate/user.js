import { presenceIf, presenceIfNot } from './custom'
import { User } from '../../model'

export const addNewUser = {
  email: {
    presence: true,
    email: true,
    isExistInDB: {
      attribute: 'email',
      model: User
    }
  },
  username: {
    presence: true,
    isExistInDB: {
      attribute: 'username',
      model: User
    }
  },
  password: {
    presence: true
  }
}

export const verifyLogin = {
  email: {
    presence: presenceIfNot('username'),
    email: presenceIfNot('username')
  },
  username: {
    presence: presenceIfNot('email')
  },
  password: {
    presence: true
  }
}
