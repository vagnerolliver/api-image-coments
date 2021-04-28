import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { MissingParamError, InvalidParamError, ServerError } from '@/presentation/errors'
import { UrlValidator } from '@/presentation/protocols'

interface SutTypes {
  sut: AddFeedController
  urlValidatorStub: UrlValidator
}

const makeUrlValidator = (): UrlValidator => {
  class UrllValidatorStub implements UrlValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new UrllValidatorStub()
}

const makeSut = (): SutTypes => {
  const urlValidatorStub = makeUrlValidator()
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

  test('Should call UrlValidator with correct url', () => {
    const { sut, urlValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        url: 'https://image.png',
        location: 'anything',
        description: 'anything'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('https://image.png')
  })

  test('Should return 500 if UrlValidator throws', () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        url: 'anything',
        location: 'anything',
        description: 'anything'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
