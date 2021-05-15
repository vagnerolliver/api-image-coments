import { DbLoadFeeds } from '@/data/usecases'
import { LoadFeeds } from '@/domain/usecases'
import { FeedMongoRepository } from '@/infra/db/mongodb/feedMongoRepository'

export const makeDbLoadFeeds = (): LoadFeeds => {
  const feedMongoRepository = new FeedMongoRepository()
  return new DbLoadFeeds(feedMongoRepository)
}
