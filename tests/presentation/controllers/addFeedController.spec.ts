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

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddFeedController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
