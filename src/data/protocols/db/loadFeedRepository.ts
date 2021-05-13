import { FeedModel } from '@/domain/models/feed'

export interface LoadFeedsRepository {
  loadAll: () => Promise<FeedModel[]>
}
