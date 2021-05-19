import { FeedModel } from '@/domain/models/feed'

export interface LoadFeedById {
  loadById: (id: string) => Promise<FeedModel>
}
