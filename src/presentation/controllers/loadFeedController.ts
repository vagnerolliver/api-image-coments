import { LoadFeed } from '@/domain/usecases/loadFeed'
import { Controller, HttpResponse } from '@/presentation/protocols'
export class LoadFeedController implements Controller {
  constructor (private readonly loadFeed: LoadFeed) {}
  async handle (): Promise<HttpResponse> {
    await this.loadFeed.load()
    return null
  }
}
