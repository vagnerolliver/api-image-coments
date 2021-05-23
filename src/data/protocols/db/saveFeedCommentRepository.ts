import { FeedCommentModel } from '@/domain/models'
import { SaveFeedCommentModel } from '@/domain/usecases'

export interface SaveFeedCommentRepository {
  save: (data: SaveFeedCommentModel) => Promise<FeedCommentModel>
}
