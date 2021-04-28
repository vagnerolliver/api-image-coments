import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { MissingParamError } from '@/presentation/errors/missingParamError'

const makeSut = (): AddFeedController => {
  return new AddFeedController()
}

describe('AddFeedController', () => {
  test('Should return 400 if no url is provided', () => {
    const sut = makeSut()
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

  test('Should return 400 if no description is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        url: 'anything',
        location: 'anything'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('description'))
  })
})
