import { AddFeed } from '@/domain/usecases/addFeed'
import { badRequest, serverError } from '@/presentation/helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
export class AddFeedController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddFeed
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { url, location, description } = httpRequest.body
      await this.addSurvey.add({
        url,
        location,
        description
      })
      return await new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
