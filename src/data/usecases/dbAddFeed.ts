import { AddFeed, AddFeedModel } from '@/domain/usecases/addFeed'
import { AddFeedRepository } from '../protocols/db/addFeedRepository'

export class DbAddFeed implements AddFeed {
  constructor (private readonly addFeedRepository: AddFeedRepository) {}

  async add (data: AddFeedModel): Promise<void> {
    await this.addFeedRepository.add(data)
  }
}
