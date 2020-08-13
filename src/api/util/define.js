import path from 'path'

export const statusName = Object.freeze({
  ok: 'OK',
  badRequest: 'BadRequest',
  notfound: 'NotFound',
  unauthorization: 'Unauthorization',
  forbidden: 'Forbidden',
  error: 'InternalError'
})

export const status = {
  OK: {
    message: '',
    code: 200
  },
  BadRequest: {
    message: 'Invalid Request',
    code: 400
  },
  Unauthorization: {
    message: 'Unauthorization',
    code: 401
  },
  Forbidden: {
    message: 'Forbidden',
    code: 403
  },
  NotFound: {
    message: 'Not Found',
    code: 404
  },
  InternalError: {
    message: 'Internal server error',
    code: 500
  }
}

export const auth = {
  privateKeyPem: path.join(process.cwd(), 'pem/jwtRS256.key'),
  publicKeyPem: path.join(process.cwd(), 'pem/jwtRS256.key.pub'),
  authAlogrithm: 'RS256'
}
