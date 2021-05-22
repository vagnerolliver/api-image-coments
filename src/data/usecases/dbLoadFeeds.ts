import { LoadFeeds } from '@/domain/usecases/loadFeeds'
import { FeedModel } from '@/domain/models'
import { LoadFeedsRepository } from '../protocols/db'
export class DbLoadFeeds implements LoadFeeds {
  constructor (private readonly loadFeedsRepository: LoadFeedsRepository) {}
  async load (): Promise<FeedModel[]> {
    const feeds = await this.loadFeedsRepository.loadAll()
    return feeds
  }
}
