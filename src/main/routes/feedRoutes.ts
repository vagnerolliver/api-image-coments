import { adaptRoute } from '@/main/adapaters/expressRouteAdapater'
import { Router } from 'express'
import { makeAddFeedController } from '@/main/factories/controllers/addFeed/addFeedControllerFactory'

export default (router: Router): void => {
  router.post('/feed', adaptRoute(makeAddFeedController()))
}
