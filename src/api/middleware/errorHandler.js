import logger from '../../shared/logger'
import { statusName } from '../util/define'

logger.addContext('type', 'API')

export default (err, req, res, next) => {
  const statusCode = err.response.statusCode,
    message = err.response.message
  if (err.error && err.statusName === statusName.error) {
    logger.error(err.error)
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(statusCode)
  res.json({
    message
  })
}
