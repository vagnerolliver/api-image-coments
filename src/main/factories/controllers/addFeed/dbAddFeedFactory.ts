import { DbAddFeed } from '@/data/usecases'
import { AddFeed } from '@/domain/usecases'
import { FeedMongoRepository } from '@/infra/db/mongodb/feedMongoRepository'

export const makeDbAddFeed = (): AddFeed => {
  const feedMongoRepository = new FeedMongoRepository()
  return new DbAddFeed(feedMongoRepository)
}
