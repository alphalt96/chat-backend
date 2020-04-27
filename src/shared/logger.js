import log4js from 'log4js'

log4js.configure({
  appenders: {
    default: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh.mm.ss}]%]\t%[[%p]%] %X{type}\t%m\n'
      }
    },
    // multiFile: {
    //   type: 'multiFile',
    //   base: 'logs/',
    //   property: ''
    // }
  },
  categories: {
    default: {
      appenders: ['default'],
      level: 'debug'
    }
  }
})

let logger = log4js.getLogger()

export default logger
