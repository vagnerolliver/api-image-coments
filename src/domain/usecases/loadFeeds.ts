import { FeedModel } from '@/domain/models/feed'

export interface LoadFeeds {
  load: () => Promise<FeedModel[]>
}
