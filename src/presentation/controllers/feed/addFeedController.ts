import { MissingParamError } from '@/presentation/errors/missingParamError'
import { badRequest } from '@/presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddFeedController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['url', 'description']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
