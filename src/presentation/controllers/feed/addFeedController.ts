import { badRequest } from '@/presentation/helpers/httpHelper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { UrlValidator } from '@/presentation/protocols/urlValidator'
import { MissingParamError } from '@/presentation/errors/missingParamError'
import { InvalidParamError } from '@/presentation/errors/invalidParamsErros'
import { ServerError } from '@/presentation/errors/serverError'

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
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
