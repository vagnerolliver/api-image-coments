import { DbAddFeed } from '@/data/usecases/dbAddFeed'
import { AddFeed } from '@/domain/usecases/addFeed'
import { FeedMongoRepository } from '@/infra/db/mongodb/feedMongoRepository'

export const makeDbAddFeed = (): AddFeed => {
  const feedMongoRepository = new FeedMongoRepository()
  return new DbAddFeed(feedMongoRepository)
}
