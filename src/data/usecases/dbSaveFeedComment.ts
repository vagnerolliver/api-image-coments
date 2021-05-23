import { SaveFeedCommentRepository } from '@/data/protocols/db/saveFeedCommentRepository'
import { FeedCommentModel } from '@/domain/models/feedComment'
import { SaveFeedComment, SaveFeedCommentModel } from '@/domain/usecases'

export class DbSaveFeedComment implements SaveFeedComment {
  constructor (private readonly saveFeedCommentRepository: SaveFeedCommentRepository) {}
  async save (data: SaveFeedCommentModel): Promise<FeedCommentModel> {
    return await this.saveFeedCommentRepository.save(data)
  }
}
