import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/httpHelper'

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

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
