import { async } from 'validate.js'
import ApiError from '../../shared/customApiError'
import { statusName } from '../util/define'

export default validateFormat => async (req, res, next) => {
  try {
    await async(req.body, validateFormat)
    next()
  } catch (e) {
    next(new ApiError(statusName.badRequest))
  }
}