import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers'
import { LoadFeedById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SaveFeedCommentController implements Controller {
  constructor (private readonly loadFeedById: LoadFeedById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const feedComment = await this.loadFeedById.loadById(httpRequest.params.feedId)
      if (!feedComment) {
        return forbidden(new InvalidParamError('feedId'))
      }
      return null
    } catch {
      return serverError(new Error())
    }
  }
}
