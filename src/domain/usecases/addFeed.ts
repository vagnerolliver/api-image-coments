import { FeedModel } from '@/domain/entities/feed'

export interface AddFeedModel {
  url: string
  description?: string
  location?: string
}

export interface AddFeed {
  add: (feed: AddFeedModel) => FeedModel
}
