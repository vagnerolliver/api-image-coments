import { LoadFeedByIdRepository } from '@/data/protocols/db'
import { FeedModel } from '@/domain/models'
import { LoadFeedById } from '@/domain/usecases'

export class DbLoadFeedById implements LoadFeedById {
  constructor (private readonly loadFeedByIdRepository: LoadFeedByIdRepository) {}

  async loadById (id: string): Promise<FeedModel> {
    return await this.loadFeedByIdRepository.loadById(id)
  }
}
