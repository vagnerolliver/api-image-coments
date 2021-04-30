import { badRequest } from '@/presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
export class AddFeedController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return await new Promise(resolve => resolve(null))
  }
}
