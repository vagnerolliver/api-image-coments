import { ok } from '@/presentation/helpers'
import { LoadFeedById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SaveFeedCommentController implements Controller {
  constructor (private readonly loadFeedById: LoadFeedById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const feedComment = await this.loadFeedById.loadById(httpRequest.params.feedId)
    return ok(feedComment)
  }
}
