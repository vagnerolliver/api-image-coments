import { AddFeed } from '@/domain/usecases/addFeed'
import { AddFeedRepository } from '@/data/protocols/db/addFeedRepository'

export class DbAddFeed implements AddFeed {
  constructor (private readonly addFeedRepository: AddFeedRepository) {}

  async add (data: AddFeed.Params): Promise<void> {
    await this.addFeedRepository.add(data)
  }
}
