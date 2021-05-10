import { FeedModel } from '@/domain/models/feed'

export interface LoadFeed {
  load: () => Promise<FeedModel>
}
