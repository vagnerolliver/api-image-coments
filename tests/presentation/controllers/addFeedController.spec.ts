import { AddFeedController } from '@/presentation/controllers/feed/addFeedController'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers/httpHelper'
import { AddFeed, AddFeedModel } from '@/domain/usecases/addFeed'

const makeFakeRequest = (): HttpRequest => ({
  body: {
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

const makeAddFeedStub = (): AddFeed => {
  class AddFeedStub implements AddFeed {
    async add (feed: AddFeedModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new AddFeedStub()
}

interface SutTypes {
  sut: AddFeedController
  validationStub: Validation
  addFeedStub: AddFeed
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addFeedStub = makeAddFeedStub()
  const sut = new AddFeedController(validationStub, addFeedStub)
  return {
    sut,
    validationStub,
    addFeedStub
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

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addFeedStub } = makeSut()
    const addSpy = jest.spyOn(addFeedStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addFeedStub } = makeSut()
    jest.spyOn(addFeedStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
