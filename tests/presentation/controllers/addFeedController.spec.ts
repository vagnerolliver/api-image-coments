import { UrlValidator } from '@/presentation/protocols/urlValidator'
import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { MissingParamError } from '@/presentation/errors/missingParamError'
import { InvalidParamError } from '@/presentation/errors/invalidParamsErros'

interface SutTypes {
  sut: AddFeedController
  urlValidatorStub: UrlValidator
}
const makeSut = (): SutTypes => {
  class UrlValidatorStub implements UrlValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const urlValidatorStub = new UrlValidatorStub()
  const sut = new AddFeedController(urlValidatorStub)
  return {
    sut,
    urlValidatorStub
  }
}

describe('AddFeedController', () => {
  test('Should return 400 if no url is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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

  test('Should return 400 if an invalid url is provided', () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        url: 'anything',
        location: 'anything',
        description: 'anything'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('url'))
  })
})
