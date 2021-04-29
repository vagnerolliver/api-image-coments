import { badRequest, serverError } from '@/presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse, UrlValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { AddFeed } from '@/domain/usecases/addFeed'

export class AddFeedController implements Controller {
  private readonly urlValidator: UrlValidator
  private readonly addFeed: AddFeed

  constructor (urlValidator: UrlValidator, addFeed: AddFeed) {
    this.urlValidator = urlValidator
    this.addFeed = addFeed
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['url', 'description']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { url, description, location } = httpRequest.body

      const isValid = this.urlValidator.isValid(url)
      if (!isValid) {
        return badRequest(new InvalidParamError('url'))
      }

      this.addFeed.add({
        url,
        description,
        location
      })
    } catch (error) {
      return serverError()
    }
  }
}
