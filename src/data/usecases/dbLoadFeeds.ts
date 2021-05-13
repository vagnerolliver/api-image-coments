import { LoadFeeds } from '@/domain/usecases/loadFeeds'
import { FeedModel } from '@/domain/models/feed'
import { LoadFeedsRepository } from '../protocols/db'

export class DbLoadFeeds implements LoadFeeds {
  constructor (private readonly loadFeedsRepository: LoadFeedsRepository) {}
  async load (): Promise<FeedModel[]> {
    await this.loadFeedsRepository.loadAll()
    return null
  }
}