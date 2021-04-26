import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'

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
  })
})
