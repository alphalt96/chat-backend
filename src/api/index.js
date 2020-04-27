import apiRouter from './router'
import { Router } from 'express'
import validatorMiddleware from './middleware/validator'

const router = Router()

const importRouters = (routes, router) => {
  routes.forEach(route => {
    if (route.path) {
      const handlers = [
        route.handler
      ]
      const middlewares = []
      if (route.validate) {
        middlewares.push(validatorMiddleware(route.validate))
      }
      if (route.middlewares && route.middlewares.length) {
        middlewares.push(...route.middlewares)
      }
      handlers.unshift(...middlewares)

      router[route.method].apply(router, [
        route.path,
        ...handlers
      ])
    } else {
      router.use(route.middewares)
    }
  })

  return router
}

export default importRouters(apiRouter, router)
