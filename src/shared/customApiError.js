import { status, statusName } from '../api/util/define'

class ApiError extends Error {
  constructor(statusName, error = { msg: '' }) {
    super(error.msg)
    this.statusName = statusName
    this.response = {
      message: status[statusName].message,
      statusCode: status[statusName].code
    }
    this.error = error
  }
}

export default ApiError