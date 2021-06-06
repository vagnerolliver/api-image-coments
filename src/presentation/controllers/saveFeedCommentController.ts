import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { forbidden, missing, serverError } from '@/presentation/helpers'
import { LoadFeedById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class SaveFeedCommentController implements Controller {
  constructor (private readonly loadFeedById: LoadFeedById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { feedId } = httpRequest.params
      const { message } = httpRequest.body
      const feed = await this.loadFeedById.loadById(feedId)
      if (feed) {
        if (!message) {
          return missing(new MissingParamError('message'))
        }
      } else {
        return forbidden(new InvalidParamError('feedId'))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
