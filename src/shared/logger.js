import log4js, { getLogger } from 'log4js'

log4js.configure({
  appenders: {
    api: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh.mm.ss}]%]\t%[[%p]%] %X{type}\t%m\n'
      }
    },
    socket: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh.mm.ss}]%]\t%[[%p]%] %X{type}\t%m\n'
      }
    }
    // multiFile: {
    //   type: 'multiFile',
    //   base: 'logs/',
    //   property: ''
    // }
  },
  categories: {
    default: {
      appenders: ['api'],
      level: 'debug'
    },
    socket: {
      appenders: ['socket'],
      level: 'debug'
    }
  }
})

const apiLogger = getLogger('api'),
  socketLogger = getLogger('socket')

export {
  apiLogger,
  socketLogger
}
