import { InvalidParamError } from '@/presentation/errors'
import { UrlValidator } from '@/validation/protocols/urlValidator'
import { UrlValidation } from '@/validation/validators/urlValidation'

const makeUrlValidator = (): UrlValidator => {
  class UrlValidatorStub implements UrlValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new UrlValidatorStub()
}

type SutTypes = {
  sut: UrlValidation
  urlValidatorStub: UrlValidator
}

const makeSut = (): SutTypes => {
  const urlValidatorStub = makeUrlValidator()
  const sut = new UrlValidation('url', urlValidatorStub)

  return {
    sut,
    urlValidatorStub
  }
}

describe('Url Validation', () => {
  test('Should return an error if UrlValidator returns false', () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ url: 'any_url' })
    expect(error).toEqual(new InvalidParamError('url'))
  })

  test('Should call UrlValidator with correct email', () => {
    const { sut, urlValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid')
    sut.validate({ url: 'any_url' })
    expect(isValidSpy).toHaveBeenCalledWith('any_url')
  })

  test('Should throw if UrlValidator throws', () => {
    const { sut, urlValidatorStub } = makeSut()
    jest.spyOn(urlValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
