import { LoadFeedByIdRepository } from '@/data/protocols/db/loadFeedById'
import { FeedModel } from '@/domain/models/feed'
import { LoadFeedById } from '@/domain/usecases/loadFeedById'

export class DbLoadFeedById implements LoadFeedById {
  constructor (private readonly loadFeedByIdRepository: LoadFeedByIdRepository) {}

  async loadById (id: string): Promise<FeedModel> {
    return await this.loadFeedByIdRepository.loadById(id)
  }
}
