import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { MissingParamError } from '@/presentation/errors/missingParamError'

describe('AddFeedController', () => {
  test('Should return 400 if no url is provided', () => {
    const sut = new AddFeedController()
    const httpRequest = {
      body: {
        description: 'anything',
        location: 'anything'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('url'))
  })
})
