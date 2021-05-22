import { FeedModel } from '@/domain/models'

export interface LoadFeedByIdRepository {
  loadById: (id: string) => Promise<FeedModel>
}
