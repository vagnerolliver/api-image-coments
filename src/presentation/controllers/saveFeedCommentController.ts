import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { forbidden, missing, serverError } from '@/presentation/helpers'
import { LoadFeedById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SaveFeedCommentController implements Controller {
  constructor (private readonly loadFeedById: LoadFeedById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { feedId } = httpRequest.params
      const { url } = httpRequest.body
      const feed = await this.loadFeedById.loadById(feedId)
      if (feed) {
        if (!url) {
          return missing(new MissingParamError('url'))
        }
      } else {
        return forbidden(new InvalidParamError('feedId'))
      }
    } catch {
      return serverError(new Error())
    }
  }
}
