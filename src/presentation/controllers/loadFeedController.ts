import { loadFeeds } from '@/domain/usecases/loadFeeds'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'
export class LoadFeedController implements Controller {
  constructor (private readonly LoadFeeds: loadFeeds) {}
  async handle (): Promise<HttpResponse> {
    const feeds = await this.LoadFeeds.load()
    return ok(feeds)
  }
}
