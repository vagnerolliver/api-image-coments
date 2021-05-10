import { MongoHelper } from '@/infra/db/mongodb/mongoHelper'
import { AddFeedRepository } from '@/data/protocols/db/addFeedRepository'
import { AddFeed } from '@/domain/usecases/addFeed'

export class FeedMongoRepository implements AddFeedRepository {
  async add (feedData: AddFeed.Params): Promise<void> {
    const feedCollection = await MongoHelper.getCollection('feed')
    await feedCollection.insertOne(feedData)
  }
}
