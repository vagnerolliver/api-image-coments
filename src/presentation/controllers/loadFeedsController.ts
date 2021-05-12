import { LoadFeeds } from '@/domain/usecases/loadFeeds'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError, noContent } from '@/presentation/helpers'
export class LoadFeedsController implements Controller {
  constructor (private readonly LoadFeeds: LoadFeeds) {}
  async handle (): Promise<HttpResponse> {
    try {
      const feeds = await this.LoadFeeds.load()
      return feeds.length ? ok(feeds) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
