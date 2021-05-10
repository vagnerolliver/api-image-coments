import { FeedModel } from '@/domain/models/feed'

export interface LoadFeed {
  add: () => Promise<FeedModel>
}
