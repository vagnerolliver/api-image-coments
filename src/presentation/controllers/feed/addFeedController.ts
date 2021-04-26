import { MissingParamError } from '@/presentation/errors/missingParamError'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/https'

export class AddFeedController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError('url')
    }
  }
}
