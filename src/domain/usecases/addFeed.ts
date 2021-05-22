import { FeedModel } from '@/domain/models'

export interface AddFeed {
  add: (feed: AddFeed.Params) => Promise<void>
}

export namespace AddFeed {
  export type Params = Omit<FeedModel, 'id'>
}
