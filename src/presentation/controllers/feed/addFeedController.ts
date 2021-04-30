import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
export class AddFeedController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve(null))
  }
}
