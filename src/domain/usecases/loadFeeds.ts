import { FeedModel } from '@/domain/models/feed'

export interface loadFeeds {
  load: () => Promise<FeedModel[]>
}
