import { AddFeed } from '@/domain/usecases/addFeed'

export interface AddFeedRepository {
  add: (feedData: AddFeed.Params) => Promise<void>
}
