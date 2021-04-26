import { MissingParamError } from '@/presentation/errors/missingParamError'
import { badRequest } from '@/presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/https'

export class AddFeedController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: badRequest(new MissingParamError('url'))
    }
  }
}
