import { AddFeed } from '@/domain/usecases'

export interface AddFeedRepository {
  add: (feedData: AddFeed.Params) => Promise<void>
}
