import { FeedCommentModel } from '@/domain/models'

export type SaveFeedResultModel = Omit<FeedCommentModel, 'id'>

export interface SaveFeedResult {
  save: (data: SaveFeedResultModel) => Promise<FeedCommentModel>
}
