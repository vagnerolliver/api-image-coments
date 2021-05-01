import { Validation } from '@/presentation/protocols'
import { UrlValidator } from '@/validation/protocols/urlValidator'
import { InvalidParamError } from '@/presentation/errors'

export class UrlValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly urlValidator: UrlValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.urlValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
