import { makeAddFeedValidation } from './addFeedValidationFactory'
import { makeDbAddFeed } from './dbAddFeedFactory'
import { AddFeedController } from '@/presentation/controllers/addFeedController'
import { Controller } from '@/presentation/protocols'

export const makeAddFeedController = (): Controller => {
  const controller = new AddFeedController(makeAddFeedValidation(), makeDbAddFeed())
  // return makeLogControllerDecorator(controller)
  return controller
}
