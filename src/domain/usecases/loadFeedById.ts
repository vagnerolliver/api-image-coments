import { FeedModel } from '@/domain/models'

export interface LoadFeedById {
  loadById: (id: string) => Promise<FeedModel>
}
