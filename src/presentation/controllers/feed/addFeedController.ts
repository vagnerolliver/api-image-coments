import { badRequest, serverError } from '@/presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse, UrlValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'

export class AddFeedController implements Controller {
  private readonly urlValidator: UrlValidator

  constructor (urlValidator: UrlValidator) {
    this.urlValidator = urlValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['url', 'description']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { url } = httpRequest.body

      const isValid = this.urlValidator.isValid(url)
      if (!isValid) {
        return badRequest(new InvalidParamError('url'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
