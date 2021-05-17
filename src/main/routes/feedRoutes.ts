import { adaptRoute } from '@/main/adapaters/expressRouteAdapater'
import { Router } from 'express'
import { makeAddFeedController } from '@/main/factories/controllers/addFeed/addFeedControllerFactory'
import { makeLoadFeedController } from '@/main/factories/controllers/loadFeeds/loadFeedsControllerFactory'

export default (router: Router): void => {
  router.post('/feeds', adaptRoute(makeAddFeedController()))
  router.get('/feeds', adaptRoute(makeLoadFeedController()))
}
