import { FeedModel } from '@/domain/models/feed'

export interface LoadFeedByIdRepository {
  loadById: (id: string) => Promise<FeedModel>
}
