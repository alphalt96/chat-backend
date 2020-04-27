import userRouter from './user'
import errorHandler from '../middleware/errorHandler'

export default [
  ...userRouter,
  // error handler must be at last of router array
  {
    middewares: [errorHandler]
  }
]