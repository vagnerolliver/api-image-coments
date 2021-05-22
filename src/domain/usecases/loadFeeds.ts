import { FeedModel } from '@/domain/models'

export interface LoadFeeds {
  load: () => Promise<FeedModel[]>
}
