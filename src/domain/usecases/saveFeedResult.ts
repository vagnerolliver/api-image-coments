import { FeedResultModel } from '@/domain/models'

export type SaveFeedResultModel = Omit<FeedResultModel, 'id'>

export interface SaveFeedResult {
  save: (data: SaveFeedResultModel) => Promise<FeedResultModel>
}
