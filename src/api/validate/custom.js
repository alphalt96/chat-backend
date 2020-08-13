import validate from 'validate.js'
import { apiLogger as logger } from '../../shared/logger'

validate.validators.isExistInDB = async (value, options, key, attributes) => {
  let result
  const Model = options.model,
    attribute = options.attribute
  const condition = {}
  condition[attribute] = value
  try {
    result = await Model.findOne(condition)
  } catch (e) {
    logger.error(e)
  }
  if (result) throw new Error()
}

export const presenceIfNot = fields => (value, options, key, attributes) => {
  let isUseValidate = false
  let existFields = fields
  if (!(fields instanceof Array)) existFields = [fields]
  existFields.forEach(field => {
    if (attributes[field]) isUseValidate = false
  })
  return isUseValidate
}
