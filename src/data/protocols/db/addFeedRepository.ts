import { AddFeedModel } from '@/domain/usecases/addFeed'

export interface AddFeedRepository {
  add: (feedData: AddFeedModel) => Promise<void>
}
