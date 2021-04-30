import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { Validation, HttpRequest } from '@/presentation/protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'valid_id',
    url: 'valid_url',
    description: 'valid_description',
    location: 'valid_location'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddFeedController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddFeedController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddFeed Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
