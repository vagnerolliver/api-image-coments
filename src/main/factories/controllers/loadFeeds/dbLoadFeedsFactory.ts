import { DbLoadFeeds } from '@/data/usecases'
import { LoadFeeds } from '@/domain/usecases'
import { FeedMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadFeeds = (): LoadFeeds => {
  const feedMongoRepository = new FeedMongoRepository()
  return new DbLoadFeeds(feedMongoRepository)
}
