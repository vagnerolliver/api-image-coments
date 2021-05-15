import { makeDbLoadFeeds } from './dbLoadFeedsFactory'
import { Controller } from '@/presentation/protocols'
import { LoadFeedsController } from '@/presentation/controllers/loadFeedsController'

export const makeLoadFeedController = (): Controller => {
  const controller = new LoadFeedsController(makeDbLoadFeeds())
  // return makeLogControllerDecorator(controller)
  return controller
}
