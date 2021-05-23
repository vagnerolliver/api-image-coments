import { FeedCommentModel } from '@/domain/models'

export type SaveFeedCommentModel = Omit<FeedCommentModel, 'id'>

export interface SaveFeedComment {
  save: (data: SaveFeedCommentModel) => Promise<FeedCommentModel>
}
