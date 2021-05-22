import { FeedModel } from '@/domain/models'

export interface LoadFeedsRepository {
  loadAll: () => Promise<FeedModel[]>
}
